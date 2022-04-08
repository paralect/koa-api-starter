import { join } from 'path';
import config from 'config';
import EmailService from './email.helper';

const emailService = new EmailService({
  apiKey: config.sendgridApiKey,
  templatesDir: join(__dirname, '../../assets/emails/dist'),
  from: {
    email: 'notifications@ship.com',
    name: 'SHIP',
  },
});

const sendSignUpWelcome = (to: $TSFixMe, dynamicTemplateData: $TSFixMe) => emailService.sendTemplate({
  to,
  subject: 'Sign Up',
  template: 'signup-welcome.html',
  dynamicTemplateData,
});

const sendForgotPassword = (to: $TSFixMe, dynamicTemplateData: $TSFixMe) => emailService.sendSendgridTemplate({
  to,
  subject: 'Welcome',
  templateId: 'your-template-id',
  dynamicTemplateData,
});

export default {
  sendSignUpWelcome,
  sendForgotPassword,
};
