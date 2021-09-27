import Router from '@koa/router';

import signUpRegister from './signup/index.js';
import logOutRegister from './logout/index.js';
import verifyEmailRegister from './verify-email/index.js';
import signInRegister from './signin/index.js';
import forgotPasswordRegister from './forgot-password/index.js';
import resetPasswordRegister from './reset-password/index.js';
import resendVerificationRegister from './resend-verification/index.js';
import googleRegister from './google/index.js';

const router = new Router();

signUpRegister(router);
logOutRegister(router);
verifyEmailRegister(router);
signInRegister(router);
forgotPasswordRegister(router);
resetPasswordRegister(router);
resendVerificationRegister(router);

googleRegister(router);

export default router.routes();
