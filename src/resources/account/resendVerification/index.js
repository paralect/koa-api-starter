const emailService = require('services/email.service');
const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

const validator = require('./validator');


const handler = async (ctx) => {
  const { email } = ctx.validatedRequest.value;
  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({
      email,
      signupToken: user.signupToken,
    });
  }

  ctx.body = {};
};

module.exports.register = (router) => {
  router.post('/resend', validate(validator), handler);
};
