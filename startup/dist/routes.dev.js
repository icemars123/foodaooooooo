"use strict";

/*
 *  Author: Gavin
 *  startup/routes.js
 */
var sms = require('../routes/sms');

var auth = require('../routes/auth');

var orders = require('../routes/orders');

var products = require('../routes/products');

var genres = require('../routes/genres');

var index = require('../routes/index');

var users = require('../routes/users');

var morgan = require('morgan');

var express = require('express');

var bodyParser = require('body-parser');

var session = require('express-session');

var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);

module.exports = function (app) {
  app.use(morgan('dev')); // Middleware

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); // Init header to allow client-sides access My API

  app.use(function (req, res, next) {
    // * value to give access to any origin(client side)
    res.header('Access-Control-Allow-Origin', '*'); // set which header setter can access along with request

    res.header('Access-Control-Allow-Headers', 'Orign, X-Reguested-With, Content-Type, Accept, Authorization'); // Check incoming request methods

    if (req.method === 'OPTIONS') {
      // Set which request method can access
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  }); // // Session
  // app.use(
  //   session(
  //     {
  //       secret: 'fooDao',
  //       resave: false,
  //       store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //       cookie: { maxAge: 180 * 60 * 1000 }
  //     }
  //   )
  // );
  // Routes

  app.use('/api/orders', orders);
  app.use('/api/products', products);
  app.use('/api/genres', genres);
  app.use('/api/index', index);
  app.use('/api/users', users);
  app.use('/api/sms', sms);
  app.use('/api/auth', auth); // handle error

  app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.status(404);
    next(error);
  });
  app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
};