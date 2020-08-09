/*
 *  Author: Gavin
 *  routes/sms.js
 */
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('@hapi/joi');
const Nexmo = require('nexmo');

const router = express.Router();

// Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: '0ce5a5ac',
    apiSecret: 'k67lP1oeoGxF809c'
  },
  {
    debug: true
  }
);

// Catch form submit
// phone number includes national code and the real number (eg. +61 452570320)
router.post('/', (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const { error } = validatePhone(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const from = 'foodao';
  const to = parseInt(req.body.number);
  var text = (Math.floor(Math.random() * (999999 - 100001 + 1)) + 100001).toString();
  // req.body.text = text;

  nexmo.message.sendSms(from, to, text, { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        console.log(err);
      }
      else {

        if (responseData.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");

          console.dir(responseData);
          // Get data from response
          const data = {
            id: responseData.messages[0]['message-id'],
            number: responseData.messages[0]['to']
          }

          // // Emit to the client
          // io.emit('smsStatus', data);

        } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }


      }
    }
  );

  res.status(200).json(
    {
      from,
      to,
      text
    }
  );
});

function validatePhone(req) {
  const schema = Joi.object(
    {
      number: Joi.string().required(),
    }
  );

  return schema.validate(req);
}



module.exports = router;