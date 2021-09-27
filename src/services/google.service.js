import { OAuth2Client } from 'google-auth-library';

import config from '../config/index.js';
import logger from '../logger.js';

const client = new OAuth2Client(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri,
);

export const oAuthURL = client.generateAuthUrl({
  access_type: 'offline',
  scope: ['email', 'profile'],
  include_granted_scopes: true,
});

export const exchangeCodeForToken = async (code) => {
  try {
    const { tokens } = await client.getToken(code);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.google.clientId,
    });

    return {
      isValid: true,
      payload: ticket.getPayload(),
    };
  } catch ({ message, ...rest }) {
    logger.error(`Exchange code for token error: ${message}`);

    return {
      isValid: false,
      payload: { message },
    };
  }
};
