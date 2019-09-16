const config = require('config');
const securityUtil = require('security.util');
const userService = require('resources/user/user.service');
const tokenService = require('resources/token/token.service');
const emailService = require('services/email.service');
const authService = require('services/auth.service');

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
exports.signup = async (ctx) => {
  const userData = ctx.validatedRequest.value;
  const user = await createUserAccount(userData);

  const response = {};

  if (config.isDev) {
    response._signupToken = user.signupToken;
  }

  ctx.body = response;
};

/**
 * Verify user's email when user click a link from email
 */
exports.verifyEmail = async (ctx, next) => {
  const data = ctx.validatedRequest.value;
  const { _id: userId } = await userService.markEmailAsVerified(data.userId);

  await Promise.all([
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);

  ctx.redirect(config.webUrl);
};

/**
 * Sign in user
 * Loads user by email and compare password hashes
 */
exports.signin = async (ctx, next) => {
  const { user: { _id: userId }, shouldCompleteTwoFa } = ctx.validatedRequest.value;

  await userService.updateLastRequest(userId);

  if (shouldCompleteTwoFa) {
    ctx.body = { shouldCompleteTwoFa };

    return;
  }

  await authService.setTokens(ctx, userId);

  ctx.body = { redirectUrl: config.webUrl };
};

/**
 * Send forgot password email with a unique link to set new password
 * If user is found by email - sends forgot password email and update
 * `forgotPasswordToken` field. If user not found, returns validator's error
 */
exports.forgotPassword = async (ctx, next) => {
  const data = ctx.validatedRequest.value;
  const user = await userService.findOne({ email: data.email });

  let { resetPasswordToken } = user;
  const { firstName } = user;
  if (!resetPasswordToken) {
    resetPasswordToken = await securityUtil.generateSecureToken();
    await userService.updateResetPasswordToken(user._id, resetPasswordToken);
  }

  const resetPasswordUrl = `${config.landingUrl}/reset-password?token=${resetPasswordToken}`;

  await emailService.sendForgotPassword({
    email: user.email,
    resetPasswordUrl,
    firstName,
  });

  ctx.body = {};
};

/**
 * Updates user password, used in combination with forgotPassword
 */
exports.resetPassword = async (ctx, next) => {
  const { userId, password } = ctx.validatedRequest.value;

  await userService.updatePassword(userId, password);
  await userService.updateResetPasswordToken(userId, '');

  ctx.body = {};
};

exports.resendVerification = async (ctx, next) => {
  const { email } = ctx.request.body;
  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({ email, signupToken: user.signupToken });
  }

  ctx.body = {};
};

/**
 * Allows to get updated access token and update refresh token
 */
exports.refreshToken = async (ctx, next) => {
  const userId = await tokenService.getUserIdByToken(ctx.state.refreshToken);

  if (!userId) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  await authService.setTokens(ctx, userId);
  ctx.body = {};
};

/**
 * Remove tokens for the user and logout
 */
exports.logout = async (ctx, next) => {
  await authService.unsetTokens(ctx);
  ctx.body = {};
};
