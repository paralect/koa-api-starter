import { Server } from 'socket.io';
import redisAdapter from 'socket.io-redis';

import config from '../config/index.js';
import tokenService from '../resources/token/token.service.js';
import { COOKIES } from '../app.constants.js';

const io = new Server();

io.adapter(redisAdapter({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
}));

const getCookie = (cookieString, name) => {
  const value = `; ${cookieString}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }

  return null;
};

io.use(async (socket, next) => {
  const accessToken = getCookie(socket.handshake.headers.cookie, COOKIES.ACCESS_TOKEN);
  const userData = await tokenService.getUserDataByToken(accessToken);

  if (userData) {
    // eslint-disable-next-line no-param-reassign
    socket.handshake.data = { userId: userData.userId, isShadow: userData.isShadow };

    return next();
  }

  return next(new Error('token is invalid'));
});

function checkAccessToRoom(roomId, data) {
  let result = false;
  const [roomType, id] = roomId.split('-');

  switch (roomType) {
    case 'user':
      result = (id === data.userId);
      break;
    default:
      result = false;
  }

  return result;
}

io.on('connection', (client) => {
  client.on('subscribe', (roomId) => {
    const { userId } = client.handshake.data;
    const hasAccessToRoom = checkAccessToRoom(roomId, { userId });

    if (hasAccessToRoom) {
      client.join(roomId);
    }
  });

  client.on('unsubscribe', (roomId) => {
    client.leave(roomId);
  });
});

io.listen(config.socketPort);
