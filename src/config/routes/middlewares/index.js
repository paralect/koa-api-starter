const urlToken = require('./urlToken.middleware');
const user = require('./user.middleware');
const applicationId = require('./applicationId.middleware');

module.exports = {
  urlToken,
  user,
  applicationId,
};
