

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send({ message: 'Access denied.' });
  }
  next();

}
// 401: Unauthorized, retry to send jsonWebToken
// 403: Forbidden, don't retry again
