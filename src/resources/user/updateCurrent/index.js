const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

const validator = require('./validator');


const handler = async (ctx) => {
  let { user } = ctx.state;

  const userData = ctx.validatedRequest.value;

  if (Object.keys(userData).length > 0) {
    user = await userService.findOneAndUpdate(
      { _id: user._id },
      { $set: userData },
    );
  }

  ctx.body = userService.getPublic(user);
};

module.exports.register = (router) => {
  router.put('/current', validate(validator), handler);
};
