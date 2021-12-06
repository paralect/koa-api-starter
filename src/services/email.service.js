const { join } = require('path');
const EmailService = require('helpers/sendgrid.helper');

const config = require('config');

const emailService = new EmailService({
  apiKey: config.sendgrid.apiKey,
  templatesDir: join(__dirname, '../assets/emails/dist'),
  from: {
    email: 'notifications@ship.com',
    name: 'SHIP',
  },
});

exports.sendSignUpWelcome = async (email, dynamicTemplateData) => {
  await emailService.sendTemplate({
    subject: 'Sign Up',
    template: 'signup-welcome.html',
    to: email,
    dynamicTemplateData,
  });

  return null;
};

exports.sendForgotPassword = async (email, dynamicTemplateData) => {
  await emailService.sendSendgridTemplate({
    subject: 'Welcome',
    templateId: 'your-template-id',
    to: email,
    dynamicTemplateData,
  });

  return null;
};
