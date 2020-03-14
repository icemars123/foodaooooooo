/*
 *  Author: Gavin
 *  startup/routes.js
 */
const sms = require('../routes/sms');
const auth = require('../routes/auth');
const orders = require('../routes/orders');
const products = require('../routes/products');
const genres = require('../routes/genres');
const index = require('../routes/index');
const users = require('../routes/users');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);



module.exports = function (app) {

  app.use(morgan('dev'));
  // Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Init header to allow client-sides access My API
  app.use((req, res, next) => {
    // * value to give access to any origin(client side)
    res.header('Access-Control-Allow-Origin', '*');
    // set which header setter can access along with request
    res.header('Access-Control-Allow-Headers',
      'Orign, X-Reguested-With, Content-Type, Accept, Authorization');
    // Check incoming request methods
    if (req.method === 'OPTIONS') {
      // Set which request method can access
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  // // Session
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
  app.use('/api/auth', auth);


  // handle error
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json(
      {
        error: {
          message: error.message
        }
      }
    );
  });

}


