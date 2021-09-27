import psl from 'psl';
import url from 'url';

import config from '../config/index.js';
import { COOKIES } from '../app.constants.js';

export const setTokenCookies = ({
  ctx,
  accessToken,
}) => {
  const parsedUrl = url.parse(config.webUrl);
  const parsed = psl.parse(parsedUrl.hostname);
  const cookiesDomain = parsed.domain;

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
  });
};

export const unsetTokenCookies = (ctx) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN);
};
