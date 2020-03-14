"use strict";

/*
 *  Author: Gavin
 *  routes/users.js
 */
var Admin = require('../middleware/Admin');

var Auth = require('../middleware/Auth');

var jwt = require('jsonwebtoken');

var config = require('config');

var bcrypt = require('bcrypt');

var _ = require('lodash');

var _require = require('../models/User'),
    User = _require.User,
    validateUser = _require.validateUser;

var csurf = require('csurf');

var express = require('express');

var router = express.Router(); // Get all users

router.get('/', function _callee(req, res, next) {
  var docs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          docs = _context.sent;
          res.status(200).json({
            message: 'Handling GET requests to /users.',
            docs: docs
          });
          _context.next = 12;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0
          });
          next();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // // Get user by id
// router.get(
//   '/:id',
//   async (req, res, next) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).send('The user with the given ID is not found');
//       res.send(user);
//     } catch (err) {
//       console.log(err)
//       res.status(500).json(
//         {
//           error: err
//         }
//       );
//       next();
//     }
//   }
// );
// Get the current user

router.get('/me', Auth, function _callee2(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            phone: req.user.phone
          }).select('-password'));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).send('The user with the given ID is not found.'));

        case 6:
          res.status(200).send(user);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0
          });
          next();

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Register user

router.post('/register', function _callee3(req, res, next) {
  var _req$body, password, password2, _validateUser, error, user, salt, token;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // check sms random number
          _req$body = req.body, password = _req$body.password, password2 = _req$body.password2;

          if (!(password !== password2)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send({
            message: 'Passwords do not match'
          }));

        case 3:
          _validateUser = validateUser(req.body), error = _validateUser.error;

          if (!error) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 6:
          _context3.prev = 6;
          _context3.next = 9;
          return regeneratorRuntime.awrap(User.findOne({
            phone: req.body.phone
          }));

        case 9:
          user = _context3.sent;

          if (!user) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'User already registered.'
          }));

        case 12:
          user = new User(_.pick(req.body, ['name', 'phone', 'email', 'password', 'registerDate', 'birth', 'sex', 'isAdmin']));
          _context3.next = 15;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 15:
          salt = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 18:
          user.password = _context3.sent;
          _context3.next = 21;
          return regeneratorRuntime.awrap(user.save());

        case 21:
          user = _context3.sent;
          // // Init JsonWebToken
          // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
          token = user.generateAuthToken(); // set header with token

          res.status(201).header('x-auth-token', token).json({
            user: user
          });
          _context3.next = 31;
          break;

        case 26:
          _context3.prev = 26;
          _context3.t0 = _context3["catch"](6);
          console.log(_context3.t0);
          res.status(500).json({
            error: _context3.t0
          });
          next();

        case 31:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 26]]);
}); // Update user

router.put('/:id', function (req, res, next) {
  var user = users.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!user) return res.status(404).send('The user with the given ID is not found');

  var _validateUser2 = validateUser(req.body),
      error = _validateUser2.error;

  if (error) return res.status(400).send(error.details[0].message);
  user.name = req.body.name;
  res.send(user);
}); // Delete user

router["delete"]('/:id', function (req, res, next) {
  var user = users.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!user) return res.status(404).send('The user with the given ID is not found');
  var index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});
module.exports = router;