const validate = require('middlewares/validate');
const securityUtil = require('security.util');
const userService = require('resources/user/user.service');
const emailService = require('services/email.service');

const config = require('config');

const validator = require('./validator');

/**
 * Create user, company, default app, send signup confirmation email and
 * create auth token for user to login
 */
const handler = async (ctx) => {
  const userData = ctx.validatedRequest.value;

  const [hash, signupToken] = await Promise.all([
    securityUtil.getHash(userData.password),
    securityUtil.generateSecureToken(),
  ]);

  const user = await userService.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    passwordHash: hash.toString(),
    email: userData.email,
    isEmailVerified: false,
    signupToken,
    oauth: {
      google: false,
    },
  });

  await emailService.sendSignupWelcome({
    email: user.email,
    signupToken,
  });

  ctx.body = {
    signupToken: config.isDev ? signupToken : undefined,
  };
};

module.exports.register = (router) => {
  router.post('/signup', validate(validator), handler);
};
