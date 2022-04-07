const psl = require('psl');
const url = require('url');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');
const { COOKIES } = require('app.constants');

exports.setTokenCookies = ({
  ctx,
  accessToken,
}: $TSFixMe) => {
  const parsedUrl = url.parse(config.webUrl);
  const parsed = psl.parse(parsedUrl.hostname);
  const cookiesDomain = parsed.domain;

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
  });
};

exports.unsetTokenCookies = (ctx: $TSFixMe) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};
