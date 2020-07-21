
const { isLoggedIn } = require('../auth');

module.exports = function (req, res, next) {
  if (isLoggedIn(req)) {
    return next(new Error('You are already logged in'));
  }

  next();
}
