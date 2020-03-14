"use strict";

/*
 *  Author: Gavin
 *  startup/db.js
 */
var mongoose = require('mongoose');

var config = require('config');

module.exports = function () {
  var db = config.get('db'); // Connection to MongoDB

  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(function () {
    return console.log('Connected to MongoDB...');
  }) // .then(() => winston.info(`Connected to ${db}...`));
  ["catch"](function (err) {
    return console.log('Could not connect to MongoDB', err);
  });
};