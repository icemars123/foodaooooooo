/*
 *  Author: Gavin
 *  startup/db.js
 */

const mongoose = require('mongoose');
const config = require('config');


module.exports = function () {
  const db = config.get('db');
  // Connection to MongoDB
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('Connected to MongoDB...'))
    // .then(() => winston.info(`Connected to ${db}...`));
    .catch(err => console.log('Could not connect to MongoDB', err));
}