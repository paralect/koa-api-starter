const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

const validator = require('./validator');


const handler = async (ctx) => {
  const userData = ctx.validatedRequest.value;

  let user;
  if (Object.keys(userData).length) {
    user = await userService.findOneAndUpdate({ _id: ctx.state.user._id }, {
      $set: { ...userData },
    });
  }

  ctx.body = userService.getPublic(user || ctx.state.user);
};

module.exports.register = (router) => {
  router.put('/current', validate(validator), handler);
};
