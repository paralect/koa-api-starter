const io = require('socket.io')();
const redis = require('socket.io-redis');

const config = require('config');
const tokenService = require('resources/token/token.service');


io.adapter(redis({
  host: config.redis.host,
  port: config.redis.port,
}));

io.use(async (socket, next) => {
  const { accessToken } = socket.handshake.query;
  const userId = await tokenService.getUserIdByToken(accessToken);

  if (userId) {
    // eslint-disable-next-line no-param-reassign
    socket.handshake.data = { userId };

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
