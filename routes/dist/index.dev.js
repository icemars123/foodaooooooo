"use strict";

/*
 *  Author: Gavin
 *  routes/index.js
 */
var csurf = require('csurf');

var express = require('express');

var cookieParser = require('cookie-parser');

var router = express.Router();
router.get('/', function (req, res) {
  res.send('Users!!!');
});
module.exports = router;