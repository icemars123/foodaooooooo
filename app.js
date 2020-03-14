/*
 *  Author: Gavin
 *  app.js
 */
const config = require('config');
const express = require('express');



// Init express engine
const app = express();

// Init jwtPrivateKey
if(!config.get('jwtPrivateKey')){
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// Startup 
require('./startup/db')();
require('./startup/routes')(app);  
require('./startup/prod')(app);
 


// Port
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
