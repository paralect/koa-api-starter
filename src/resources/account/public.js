const Router = require('koa-router');
const validate = require('middlewares/validate');
const validators = require('./validators');

const router = new Router();
const controller = require('./account.controller');
const googleController = require('./google/google.controller');

router.post('/signup', validate(validators.signup), controller.signup);
router.post('/logout', controller.logout);
router.get('/verifyEmail/:token', validate(validators.verifyEmail), controller.verifyEmail);
router.post('/signin', validate(validators.signin), controller.signin);
router.post('/forgotPassword', validate(validators.forgotPassword), controller.forgotPassword);
router.put('/resetPassword', validate(validators.resetPassword), controller.resetPassword);
router.post('/resend', controller.resendVerification);
router.post('/refresh-token', controller.refreshToken);

router.get('/signin/google/auth', googleController.getOAuthUrl);
router.get('/signin/google', googleController.signinGoogleWithCode);

module.exports = router.routes();
