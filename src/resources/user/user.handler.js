const userService = require('resources/user/user.service');
const ioEmitter = require('ioEmitter');


userService.on('updated', ({ fullDocument }) => {
  const roomId = `user-${fullDocument._id}`;
  ioEmitter.to(roomId).emit('user:updated', fullDocument);
});

userService.on('replaced', ({ fullDocument }) => {
  const roomId = `user-${fullDocument._id}`;
  ioEmitter.to(roomId).emit('user:updated', fullDocument);
});
