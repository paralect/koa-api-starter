const { join } = require('path');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');

const EmailService = require('./email.helper');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'emailServi... Remove this comment to see the full error message
const emailService = new EmailService({
  apiKey: config.sendgridApiKey,
  templatesDir: join(__dirname, '../../assets/emails/dist'),
  from: {
    email: 'notifications@ship.com',
    name: 'SHIP',
  },
});

exports.sendSignUpWelcome = (to: $TSFixMe, dynamicTemplateData: $TSFixMe) => emailService.sendTemplate({
  to,
  subject: 'Sign Up',
  template: 'signup-welcome.html',
  dynamicTemplateData,
});

exports.sendForgotPassword = (to: $TSFixMe, dynamicTemplateData: $TSFixMe) => emailService.sendSendgridTemplate({
  to,
  subject: 'Welcome',
  templateId: 'your-template-id',
  dynamicTemplateData,
});
