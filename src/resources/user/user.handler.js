const userService = require('resources/user/user.service');
const ioEmitter = require('ioEmitter');

userService.on('updated', ({ doc: user }) => {
  const roomId = `user-${user._id}`;
  ioEmitter.to(roomId).emit('user:updated', user);
});
