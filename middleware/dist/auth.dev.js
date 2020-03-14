"use strict";

/*
 *  Author: Gavin
 *  middleware/auth.js
 */
var jwt = require('jsonwebtoken');

var config = require('config');

function auth(req, res, next) {
  var token = req.header('x-auth-token');

  if (!token) {
    // 401 means the client doesn't have the authentication credantial
    // to access the resources.
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // verify method will check the verification. If the token is verified, 
    // this method will decode the payload of jsonWebToken. 
    var decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;