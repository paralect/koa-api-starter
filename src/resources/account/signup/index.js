const config = require('config');
const validate = require('middlewares/validate');
const securityUtil = require('security.util');
const userService = require('resources/user/user.service');
const emailService = require('services/email.service');

const validator = require('./validator');


const createUserAccount = async (userData) => {
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

  const verifyEmailUrl = `${config.apiUrl}/account/verifyEmail/${signupToken}`;

  await emailService.sendSignupWelcome({ email: user.email, verifyEmailUrl });

  return user;
};

/**
 * Create user, company, default app, send signup confirmation email and
 * create auth token for user to login
 */
const handler = async (ctx) => {
  const userData = ctx.validatedRequest.value;
  const user = await createUserAccount(userData);

  const response = {};

  if (config.isDev) {
    response._signupToken = user.signupToken;
  }

  ctx.body = response;
};

module.exports.register = (router) => {
  router.post('/signup', validate(validator), handler);
};
