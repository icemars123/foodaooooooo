"use strict";

/*
 *  Author: Gavin
 *  routes/orders.js
 */
var Auth = require('../middleware/Auth');

var _require = require('../models/Product'),
    Product = _require.Product;

var _require2 = require('../models/Order'),
    Order = _require2.Order,
    validateOrder = _require2.validateOrder,
    addOrder = _require2.addOrder;

var express = require('express');

var router = express.Router(); // Get All orders

router.get('/', function _callee(req, res, next) {
  var docs, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.find());

        case 3:
          docs = _context.sent;
          response = {
            count: docs.length,
            orders: docs
          };
          res.status(200).json({
            message: 'Handling GET requests to /products.',
            response: response
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          for (field in _context.t0.errors) {
            console.log(_context.t0.errors[field].message);
          }

          next();

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Add product to order

router.get('/:productId', function _callee2(req, res, next) {
  var productId, order, product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productId = req.params.productId;
          order = new addOrder(req.session.order ? req.session.order : {});
          _context2.next = 4;
          return regeneratorRuntime.awrap(Product.findById(productId));

        case 4:
          product = _context2.sent;

          if (!(product <= 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).send('Invalid product.'));

        case 7:
          card.add(product, product._id);
          res.status(200).json({
            message: 'The Order details',
            orderId: req.params.orderId
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Create a new order

router.post('/', Auth, function _callee3(req, res, next) {
  var items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, _validateOrder, error, product, order;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Validate request body
          items = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 4;
          _iterator = req.body.products[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 20;
            break;
          }

          item = _step.value;
          _validateOrder = validateOrder(item), error = _validateOrder.error;

          if (!error) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(Product.findById(item.productId));

        case 13:
          product = _context3.sent;

          if (product) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", res.status(400).send('Invalid product.'));

        case 16:
          items.push({
            product: {
              _id: product._id,
              dishName: product.dishName,
              price: product.price,
              unit: product.unit
            },
            quantity: item.quantity
          });

        case 17:
          _iteratorNormalCompletion = true;
          _context3.next = 6;
          break;

        case 20:
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 26:
          _context3.prev = 26;
          _context3.prev = 27;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 29:
          _context3.prev = 29;

          if (!_didIteratorError) {
            _context3.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context3.finish(29);

        case 33:
          return _context3.finish(26);

        case 34:
          // const { error } = validateOrder(req.body.products[0]);
          // if (error) return res.status(400).send(error.details[0].message);
          // const product = await Product.findById(req.body.products[0].productId);
          // if (!product) return res.status(400).send('Invalid product.');
          order = new Order({
            date: req.body.date,
            total: req.body.total,
            // products: [
            //   {
            //     product: {
            //       _id: product._id,
            //       category: product.category,
            //       price: product.price
            //     },
            //     quantity: req.body.products[0].quantity
            //   }
            // ],
            products: items
          });
          _context3.prev = 35;
          _context3.next = 38;
          return regeneratorRuntime.awrap(order.save());

        case 38:
          order = _context3.sent;
          res.status(201).json({
            // message: 'Order was created.',
            order: order
          });
          _context3.next = 47;
          break;

        case 42:
          _context3.prev = 42;
          _context3.t1 = _context3["catch"](35);
          console.log(_context3.t1);
          res.status(500).json({
            error: _context3.t1
          });
          next();

        case 47:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 22, 26, 34], [27,, 29, 33], [35, 42]]);
}); // Update the order by orderId

router.put('/:orderId', function (req, res, next) {
  res.status(200).json({
    message: 'The order was changed.'
  });
}); // Delete the order By orderId

router["delete"]('/:orderId', function (req, res, next) {
  res.status(200).json({
    message: 'The order was deleted',
    orderId: req.params.orderId
  });
});
module.exports = router;