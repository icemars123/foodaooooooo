"use strict";

/*
 *  Author: Gavin
 *  routes/genres.js
 */
var Admin = require('../middleware/Admin');

var Auth = require('../middleware/Auth');

var _require = require('../models/Genre'),
    Genre = _require.Genre,
    validateGenre = _require.validateGenre;

var bodyParer = require('body-parser');

var mongoose = require('mongoose');

var express = require('express');

var router = express.Router(); // Get all genres

router.get('/', function _callee(req, res) {
  var genres;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Genre.find().sort({
            name: 1
          }));

        case 3:
          genres = _context.sent;
          res.send(genres);
          console.log(genres);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).send('Something failed');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Get genre by id

router.get('/:id', function _callee2(req, res) {
  var genre;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Genre.findById(req.params.id));

        case 3:
          genre = _context2.sent;

          if (genre) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).send('The genre with the given ID was not found.'));

        case 6:
          res.send(genre);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send('Something failed');

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Create genres

router.post('/', [Auth, Admin], function _callee3(req, res) {
  var _validateGenre, error, genre, check;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _validateGenre = validateGenre(req.body), error = _validateGenre.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          genre = new Genre({
            name: req.body.name
          });
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Genre.find({
            name: req.body.name
          }));

        case 7:
          check = _context3.sent;

          if (!(check.length > 0)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(409).send('The name already exists'));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(genre.save());

        case 12:
          genre = _context3.sent;
          res.send(genre);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](4);

          for (field in _context3.t0) {
            console.log(field.message);
          }

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 16]]);
}); // Update the genre

router.put('/:id', function _callee4(req, res) {
  var _validateGenre2, error, genre;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _validateGenre2 = validateGenre(req.body), error = _validateGenre2.error;

          if (!error) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name
          }, {
            "new": true
          }));

        case 6:
          genre = _context4.sent;

          if (genre) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).send('The genre with the given ID was not found.'));

        case 9:
          res.send(genre);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](3);

          for (field in _context4.t0) {
            console.log(field.message);
          }

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 12]]);
}); // Delete the genre

router["delete"]('/:id', [Auth, Admin], function _callee5(req, res) {
  var genre;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Genre.findByIdAndDelete(req.params.id));

        case 3:
          genre = _context5.sent;

          if (genre) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).send('The genre with the given ID was not found.'));

        case 6:
          res.send(genre);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);

          for (field in _context5.t0) {
            console.log(field.message);
          }

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;