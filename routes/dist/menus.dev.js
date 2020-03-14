"use strict";

/*
 *  Author: Gavin
 *  routes/menus.js
 */
var _require = require('../models/Genre'),
    Genre = _require.Genre;

var _require2 = require('../models/Menu'),
    Menu = _require2.Menu,
    validateMenu = _require2.validateMenu;

var bodyParer = require('body-parser');

var mongoose = require('mongoose');

var express = require('express');

var router = express.Router(); // Get all menus

router.get('/', function _callee(req, res, next) {
  var docs, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Menu.find());

        case 3:
          docs = _context.sent;
          // construct object 
          response = {
            count: docs.length,
            menus: docs.map(function (doc) {
              return {
                _id: doc._id,
                category: doc.category,
                price: doc.price,
                main_materials: doc.main_materials,
                taste: doc.taste,
                features: doc.features,
                isPublished: doc.isPublished,
                genre: doc.genreId,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/api/menus/" + doc._id
                }
              };
            })
          }; // sent by json object

          res.status(200).json(response);
          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0
          });
          next();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Get menu by id

router.get('/:id', function _callee2(req, res, next) {
  var doc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Menu.findById(req.params.id));

        case 3:
          doc = _context2.sent;

          if (!(doc.length <= 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'The menu with the given ID was not found.'
          }));

        case 6:
          // sent result by json
          res.status(200).json({
            menu: doc,
            request: {
              type: "GET",
              description: "GET ALL MMENUS",
              url: "http://localhost:3000/api/menus"
            }
          });
          _context2.next = 14;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            error: _context2.t0
          });
          next();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Create and add a menu

router.post('/', function _callee3(req, res, next) {
  var _validateMenu, error, menu, _genre, check;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _validateMenu = validateMenu(req.body), error = _validateMenu.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          menu = new Menu({
            category: req.body.category,
            price: req.body.price,
            main_materials: req.body.main_materials,
            taste: req.body.taste,
            features: req.body.features,
            isPublished: req.body.isPublished,
            genre: {
              _id: genre._id,
              name: genre.name
            }
          });
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Genre.findById(req.body.genreId));

        case 7:
          _genre = _context3.sent;

          if (_genre) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('Invalid genre'));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(Menu.find({
            category: req.body.category
          }));

        case 12:
          check = _context3.sent;

          if (!(check.length > 0)) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", res.status(409).send('The category already exist'));

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(menu.save());

        case 17:
          menu = _context3.sent;
          res.status(201).json({
            message: 'Created menu successfully',
            createdMenu: {
              category: menu.category,
              price: menu.price,
              main_materials: menu.main_materials,
              taste: menu.taste,
              features: menu.features,
              isPublished: menu.isPublished,
              genre: {
                _id: menu.genre._id,
                name: menu.genre.name
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/api/menus/" + menu._id
              }
            }
          });
          _context3.next = 26;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](4);
          console.log(_context3.t0);
          res.status(500).json({
            error: _context3.t0
          });
          next();

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 21]]);
}); // update a menu by Id

router.put('/:id', function _callee4(req, res, next) {
  var _validateMenu2, error, _genre2, check, menu;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _validateMenu2 = validateMenu(req.body), error = _validateMenu2.error;

          if (!error) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(Genre.findById(req.body.genreId));

        case 6:
          _genre2 = _context4.sent;

          if (_genre2) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Invalid genre'));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(Menu.find({
            category: req.body.category
          }));

        case 11:
          check = _context4.sent;

          if (!(check.length > 0)) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", res.status(409).send('The category already exist'));

        case 14:
          _context4.next = 16;
          return regeneratorRuntime.awrap(Menu.findByIdAndUpdate(req.params.id, {
            category: req.body.category,
            price: req.body.price,
            main_materials: req.body.main_materials,
            taste: req.body.taste,
            features: req.body.features,
            isPublished: req.body.isPublished,
            genre: {
              _id: _genre2._id,
              name: _genre2.name
            }
          }, {
            "new": true
          }));

        case 16:
          menu = _context4.sent;

          if (!(menu.length <= 0)) {
            _context4.next = 19;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'The menu with the given ID was not found.'
          }));

        case 19:
          res.status(200).json({
            message: 'Menu updated successfully',
            createdMenu: {
              category: menu.category,
              price: menu.price,
              main_materials: menu.main_materials,
              taste: menu.taste,
              features: menu.features,
              isPublished: menu.isPublished,
              genre: {
                _id: menu.genre._id,
                name: menu.genre.name
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/api/menus/" + menu._id
              }
            }
          });
          _context4.next = 27;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](3);
          console.log(_context4.t0);
          res.status(500).json({
            error: _context4.t0
          });
          next();

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 22]]);
});
router.patch('/:id', function _callee5(req, res, patch) {
  var updateOps, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ops, menu;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          updateOps = {};
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context5.prev = 4;

          for (_iterator = req.body[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            ops = _step.value;
            updateOps[ops.propName] = ops.value;
          }

          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context5.t0;

        case 12:
          _context5.prev = 12;
          _context5.prev = 13;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 15:
          _context5.prev = 15;

          if (!_didIteratorError) {
            _context5.next = 18;
            break;
          }

          throw _iteratorError;

        case 18:
          return _context5.finish(15);

        case 19:
          return _context5.finish(12);

        case 20:
          _context5.next = 22;
          return regeneratorRuntime.awrap(Menu.findByIdAndUpdate(req.params.id, {
            $set: updateOps
          }, {
            "new": true
          }));

        case 22:
          menu = _context5.sent;

          if (!(menu.length <= 0)) {
            _context5.next = 25;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'The menu with the given ID was not found.'
          }));

        case 25:
          res.status(200).json({
            message: 'Menu updated successfully',
            request: {
              type: "GET",
              url: "http://localhost:3000/api/menus/" + menu._id
            }
          });

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 8, 12, 20], [13,, 15, 19]]);
}); // Delete a menu

router["delete"]('/:id', function _callee6(req, res, next) {
  var menu;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Menu.findByIdAndDelete(req.params.id));

        case 3:
          menu = _context6.sent;

          if (menu) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).send('The menu with the given ID was not found.'));

        case 6:
          res.status(200).json({
            message: 'Menu deleted successfully',
            request: {
              type: "POST",
              url: "http://localhost:3000/api/menus"
            }
          });
          _context6.next = 14;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json({
            error: _context6.t0
          });
          next();

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;