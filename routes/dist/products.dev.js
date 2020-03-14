"use strict";

/*
 *  Author: Gavin
 *  routes/products.js
 */
var Admin = require('../middleware/Admin');

var Auth = require('../middleware/Auth');

var _require = require('../models/Genre'),
    Genre = _require.Genre;

var _require2 = require('../models/Product'),
    Product = _require2.Product,
    validateProduct = _require2.validateProduct;

var bodyParer = require('body-parser');

var mongoose = require('mongoose');

var express = require('express');

var router = express.Router(); // Get all products

router.get('/', function _callee(req, res, next) {
  var docs, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find());

        case 3:
          docs = _context.sent;
          // construct object 
          response = {
            count: docs.length,
            products: docs.map(function (doc) {
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
                  url: "http://localhost:3000/api/products/" + doc._id
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
}); // Get product by id

router.get('/:id', function _callee2(req, res, next) {
  var doc;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.findById(req.params.id));

        case 3:
          doc = _context2.sent;

          if (!(doc.length <= 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'The product with the given ID was not found.'
          }));

        case 6:
          // sent result by json
          res.status(200).json({
            product: doc,
            request: {
              type: "GET",
              description: "GET ALL Mproducts",
              url: "http://localhost:3000/api/products"
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
}); // Create and add a product

router.post('/', function _callee3(req, res, next) {
  var _validateProduct, error, genre, product, check;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Validate request body
          _validateProduct = validateProduct(req.body), error = _validateProduct.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Genre.findById(req.body.genreId));

        case 5:
          genre = _context3.sent;

          if (genre) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('Invalid genre'));

        case 8:
          product = new Product({
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
          _context3.prev = 9;
          _context3.next = 12;
          return regeneratorRuntime.awrap(Product.find({
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
          return regeneratorRuntime.awrap(product.save());

        case 17:
          product = _context3.sent;
          res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
              category: product.category,
              price: product.price,
              main_materials: product.main_materials,
              taste: product.taste,
              features: product.features,
              isPublished: product.isPublished,
              genre: {
                _id: product.genre._id,
                name: product.genre.name
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/api/products/" + product._id
              }
            }
          });
          _context3.next = 26;
          break;

        case 21:
          _context3.prev = 21;
          _context3.t0 = _context3["catch"](9);
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
  }, null, null, [[9, 21]]);
}); // update a product by Id

router.put('/:id', function _callee4(req, res, next) {
  var _validateProduct2, error, genre, check, product;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _validateProduct2 = validateProduct(req.body), error = _validateProduct2.error;

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
          genre = _context4.sent;

          if (genre) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Invalid genre'));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(Product.find({
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
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(req.params.id, {
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
          }, {
            "new": true
          }));

        case 16:
          product = _context4.sent;

          if (!(product.length <= 0)) {
            _context4.next = 19;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'The product with the given ID was not found.'
          }));

        case 19:
          res.status(200).json({
            message: 'Product updated successfully',
            createdProduct: {
              category: product.category,
              price: product.price,
              main_materials: product.main_materials,
              taste: product.taste,
              features: product.features,
              isPublished: product.isPublished,
              genre: {
                _id: product.genre._id,
                name: product.genre.name
              },
              request: {
                type: "GET",
                url: "http://localhost:3000/api/products/" + product._id
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
  var updateOps, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ops, product;

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
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(req.params.id, {
            $set: updateOps
          }, {
            "new": true
          }));

        case 22:
          product = _context5.sent;

          if (!(product.length <= 0)) {
            _context5.next = 25;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'The product with the given ID was not found.'
          }));

        case 25:
          res.status(200).json({
            message: 'Product updated successfully',
            request: {
              type: "GET",
              url: "http://localhost:3000/api/products/" + product._id
            }
          });

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[4, 8, 12, 20], [13,, 15, 19]]);
}); // Delete a product

router["delete"]('/:id', [Auth, Admin], function _callee6(req, res, next) {
  var product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(req.params.id));

        case 3:
          product = _context6.sent;

          if (product) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).send('The product with the given ID was not found.'));

        case 6:
          res.status(200).json({
            message: 'Product deleted successfully',
            request: {
              type: "POST",
              url: "http://localhost:3000/api/products"
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