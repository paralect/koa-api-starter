const path = require('path');
const fs = require('fs');
const util = require('util');
const Handlebars = require('handlebars');
const sgMail = require('@sendgrid/mail');

const logger = require('logger');

const render = async (templatePath, templateParams) => {
  const readFile = util.promisify(fs.readFile);

  const template = await readFile(templatePath);
  const compiledHtml = Handlebars.compile(template.toString());

  return compiledHtml(templateParams);
};

class MailService {
  constructor(config = {}) {
    const {
      apiKey,
      templatesDir,
      from,
      isSendEmail = true,
    } = config;

    this.apiKey = apiKey;
    this.templatesDir = templatesDir;
    this.from = from;
    this.isSendEmail = isSendEmail;
  }

  async sendTemplate(props) {
    if (this.isSendEmail) {
      sgMail.setApiKey(this.apiKey);

      const templatePath = path.join(this.templatesDir, props.template);
      const html = await render(templatePath, props.dynamicTemplateData);

      const message = props.from
        ? props
        : { ...props, from: this.from };

      try {
        await sgMail.send({ ...message, html });

        logger.debug(`Email based on template ${props.template} has been successfully sent`);
      } catch (error) {
        throw new Error(`Error sending email: ${error}`);
      }
    }

    return null;
  }

  async sendSendgridTemplate(props) {
    if (this.isSendEmail) {
      sgMail.setApiKey(this.apiKey);

      const message = props.from
        ? props
        : { ...props, from: this.from };

      try {
        await sgMail.send(message);

        logger.debug(`Email based on templateId ${props.templateId} has been successfully sent`);
      } catch (error) {
        throw new Error(`Error sending email: ${error}`);
      }
    }

    return null;
  }
}

module.exports = MailService;
