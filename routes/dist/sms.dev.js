"use strict";

/*
 *  Author: Gavin
 *  routes/sms.js
 */
var express = require('express');

var bodyParser = require('body-parser');

var Nexmo = require('nexmo');

var router = express.Router(); // Init Nexmo

var nexmo = new Nexmo({
  apiKey: '0ce5a5ac',
  apiSecret: 'k67lP1oeoGxF809c'
}, {
  debug: true
}); // Catch form submit

router.post('/', function (req, res) {
  // res.send(req.body);
  // console.log(req.body);
  var from = 'foodao';
  var to = parseInt(req.body.number);
  var text = req.body.text;
  text = (Math.floor(Math.random() * (999999 - 100001 + 1)) + 100001).toString();
  nexmo.message.sendSms(from, to, text, {
    type: 'unicode'
  }, function (err, responseData) {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") {
        console.log("Message sent successfully.");
        console.dir(responseData); // Get data from response

        var data = {
          id: responseData.messages[0]['message-id'],
          number: responseData.messages[0]['to']
        }; // // Emit to the client
        // io.emit('smsStatus', data);
      } else {
        console.log("Message failed with error: ".concat(responseData.messages[0]['error-text']));
      }
    }
  });
});
module.exports = router;