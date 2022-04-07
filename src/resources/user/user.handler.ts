// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
const ioEmitter = require('io-emitter');

userService.on('updated', ({
  doc,
}: $TSFixMe) => {
  const roomId = `user-${doc._id}`;
  ioEmitter.to(roomId).emit('user:updated', doc);
});
