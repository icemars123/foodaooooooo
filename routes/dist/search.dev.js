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

var router = express.Router(); // Get products by genreId

router.get('/', function _callee(req, res, next) {
  var doc;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // docs from db
          console.log('price: ' + req.query.price);
          _context.next = 4;
          return regeneratorRuntime.awrap(Product.find({
            'genre._id': req.query.id
          }));

        case 4:
          doc = _context.sent;

          if (!(doc.length <= 0)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'The product with the price was not found.'
          }));

        case 7:
          // sent result by json
          res.status(200).json({
            product: doc,
            request: {
              type: "GET",
              description: "GET ALL Mproducts",
              url: "http://localhost:3000/api/products"
            }
          });
          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0
          });
          next();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;