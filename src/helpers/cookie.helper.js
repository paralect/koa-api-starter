const psl = require('psl');
const url = require('url');
const config = require('config');
const { COOKIES } = require('app.constants');

exports.setTokenCookies = ({
  ctx,
  accessToken,
  accessTokenExpireAt,
  refreshToken,
  refreshTokenExpireAt,
}) => {
  const parsedUrl = url.parse(config.webUrl);
  const parsed = psl.parse(parsedUrl.hostname);
  const cookiesDomain = parsed.domain;

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: false,
    expires: accessTokenExpireAt,
    domain: cookiesDomain,
  });

  ctx.cookies.set(COOKIES.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    expires: refreshTokenExpireAt,
    domain: cookiesDomain,
  });
};

exports.unsetTokenCookies = (ctx) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
  ctx.cookies.set(COOKIES.REFRESH_TOKEN);
};
