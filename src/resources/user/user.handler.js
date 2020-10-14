const kafka = require('kafka');

const userService = require('resources/user/user.service');
const ioEmitter = require('ioEmitter');

kafka.processors.user.on('user:signup', async (message) => {
  await userService.create(message.data);
});

userService.on('updated', ({ doc }) => {
  const roomId = `user-${doc._id}`;
  ioEmitter.to(roomId).emit('user:updated', doc);
});
