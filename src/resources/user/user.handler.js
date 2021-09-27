import userService from './user.service.js';
import ioEmitter from '../../ioEmitter.js';

userService.on('updated', ({ doc }) => {
  const roomId = `user-${doc._id}`;
  ioEmitter.to(roomId).emit('user:updated', doc);
});
