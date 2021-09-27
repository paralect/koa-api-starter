import faker from 'faker';

import db from 'tests/db';
import { USER } from 'tests/constants';
import { getHashSync } from 'tests/security.util';
import BaseBuilder from 'tests/base.builder';

import validateSchema from './user.schema';

const userService = db.createService(USER.COLLECTION, { validate: validateSchema });

class UserBuilder extends BaseBuilder {
  constructor({
    firstName = faker.name.firstName(),
    lastName = faker.name.lastName(),
    email = faker.internet.email().toLowerCase(),
    createdOn = new Date(),
    lastRequest = new Date(),
    signupToken = USER.DEFAULT_SIGNUP_TOKEN,
    password = USER.DEFAULT_PASSWORD,
  } = {}) {
    super(userService);

    this.data = {
      ...this.data,
      firstName,
      lastName,
      email,
      createdOn,
      lastRequest,
      signupToken,
      passwordHash: getHashSync(password),
      isEmailVerified: false,
      oauth: { google: false },
    };
  }

  googleAuth() {
    this.data.oauth.google = true;
    this.data.isEmailVerified = true;
    this.data.signupToken = null;
    return this;
  }

  emailVerified() {
    this.data.isEmailVerified = true;
    this.data.signupToken = null;
    return this;
  }

  forgotPassword(token = USER.DEFAULT_RESET_PASSWORD_TOKEN) {
    this.data.resetPasswordToken = token;
    return this;
  }
}

export default UserBuilder;
