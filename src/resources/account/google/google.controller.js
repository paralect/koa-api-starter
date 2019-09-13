const config = require('config');
const userService = require('resources/user/user.service');
const googleService = require('resources/account/google/google.service.js');
const authService = require('services/auth.service');

const createUserAccount = async (userData) => {
  const user = await userService.create({
    firstName: userData.given_name,
    lastName: userData.family_name,
    email: userData.email,
    isEmailVerified: true,
    oauth: {
      google: true,
    },
  });

  return user;
};

exports.getOAuthUrl = async (ctx) => {
  ctx.redirect(googleService.oAuthURL);
};

const ensureAccountCreated = async (payload) => {
  const user = await userService.findOne({ email: payload.email });

  if (user) {
    if (!user.oauth.google) {
      const userChanged = await userService.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            oauth: {
              google: true,
            },
          },
        },
      );

      return userChanged;
    }

    return user;
  }

  return createUserAccount(payload);
};

exports.signinGoogleWithCode = async (ctx) => {
  const { code } = ctx.request.query;
  const { isValid, payload } = await googleService.exchangeCodeForToken(code);

  ctx.assert(isValid, 404);

  const { _id: userId } = await ensureAccountCreated(payload);

  await Promise.all([
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);
  ctx.redirect(config.webUrl);
};
