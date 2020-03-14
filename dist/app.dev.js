"use strict";

/*
 *  Author: Gavin
 *  app.js
 */
var config = require('config');

var express = require('express'); // Init express engine


var app = express(); // Init jwtPrivateKey

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
} // Startup 


require('./startup/db')();

require('./startup/routes')(app);

require('./startup/prod')(app); // Port


var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
module.exports = server;