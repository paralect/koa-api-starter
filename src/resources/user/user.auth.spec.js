/* eslint no-await-in-loop: 0, no-loop-func: 0 */
import supertest from 'supertest';
import chai from 'chai';

import server from 'app';
import db from 'tests/db';
import { USER } from 'tests/constants';
import { signin } from 'tests/auth.helper';
import { test } from 'tests/tests.helper';

import UserBuilder from './user.builder';

const app = server.listen();
chai.should();

describe('/users', async () => {
  let userRequest;
  let authUserRequest;

  before(async () => {
    await db.get(USER.COLLECTION).drop();

    const [, authUser] = await Promise.all([
      new UserBuilder().emailVerified().build(),
      new UserBuilder().emailVerified().build(),
    ]);

    userRequest = supertest.agent(app);
    authUserRequest = supertest.agent(app);
    await signin(authUserRequest, authUser);
  });

  it('should return an error for not authed user', (done) => {
    test(done, async () => {
      await userRequest.get('/users/current')
        .expect(401);
    });
  });

  it('should successfully response for authed user', (done) => {
    test(done, async () => {
      await authUserRequest.get('/users/current')
        .expect(200);
    });
  });

  it('should return an error for not authed user', (done) => {
    test(done, async () => {
      await userRequest.put('/users/current')
        .expect(401);
    });
  });

  it('should successfully response for authed user', (done) => {
    test(done, async () => {
      await authUserRequest.put('/users/current')
        .expect(200);
    });
  });
});
