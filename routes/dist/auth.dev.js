"use strict";

/*
 *  Author: Gavin
 *  routes/auth.js
 */
var config = require('config');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var _ = require('lodash');

var _require = require('../models/User'),
    User = _require.User;

var Joi = require('@hapi/joi');

var csurf = require('csurf');

var express = require('express');

var router = express.Router(); // Create Authentication Token  

router.post('/token', function _callee(req, res, next) {
  var _validateRequest, error, user, validPassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validateRequest = validateRequest(req.body), error = _validateRequest.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            phone: req.body.phone
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'Invalid phone number'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 11:
          validPassword = _context.sent;

          if (validPassword) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid password'
          }));

        case 14:
          // Init to generate Authentication JsonWebToken
          token = user.generateAuthToken();
          res.status(201).send({
            message: 'True.',
            token: token
          });
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0
          });
          next();

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 18]]);
});

function validateRequest(req) {
  var schema = Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().email(),
    // password must contains 0-9, a-z, A-Z, signal
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/)
  });
  return schema.validate(req);
}

module.exports = router;