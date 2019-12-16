const userService = require('resources/user/user.service');
const emailService = require('services/email.service');


const handler = async (ctx, next) => {
  const { email } = ctx.request.body;
  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({ email, signupToken: user.signupToken });
  }

  ctx.body = {};
};

module.exports.register = (router) => {
  router.post('/resend', handler);
};
