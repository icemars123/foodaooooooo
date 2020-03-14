/*
 *  Author: Gavin
 *  routes/index.js
 */
const csurf= require('csurf');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();



router.get(
  '/',
  (req, res) => {
    res.send('Users!!!')
  }
);



module.exports = router;