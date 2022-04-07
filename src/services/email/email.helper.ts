import path from 'path';
import handlebars from 'handlebars';
import sendgrid from '@sendgrid/mail';
import fs from 'fs/promises';

const render = async (templatePath: $TSFixMe, templateParams: $TSFixMe) => {
  const template = await fs.readFile(templatePath);
  const compiledHtml = handlebars.compile(template.toString());

  return compiledHtml(templateParams);
};

class MailService {
  apiKey: $TSFixMe;

  from: $TSFixMe;

  templatesDir: $TSFixMe;

  constructor({
    apiKey,
    templatesDir,
    from,
  }: $TSFixMe) {
    this.apiKey = apiKey;
    this.from = from;
    this.templatesDir = templatesDir;

    sendgrid.setApiKey(apiKey);
  }

  async sendTemplate({
    to,
    subject,
    template,
    dynamicTemplateData,
  }: $TSFixMe) {
    if (!this.apiKey) return null;

    const templatePath = path.join(this.templatesDir, template);
    const html = await render(templatePath, dynamicTemplateData);

    return sendgrid.send({
      to,
      from: this.from,
      subject,
      html,
    });
  }

  async sendSendgridTemplate({
    to,
    subject,
    templateId,
    dynamicTemplateData,
  }: $TSFixMe) {
    if (!this.apiKey) return null;

    return sendgrid.send({
      to,
      from: this.from,
      subject,
      templateId,
      dynamicTemplateData,
    });
  }
}

export default MailService;
