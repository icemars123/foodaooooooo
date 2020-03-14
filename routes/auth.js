/*
 *  Author: Gavin
 *  routes/auth.js
 */
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');
const Joi = require('@hapi/joi');
const csurf = require('csurf');
const express = require('express');

const router = express.Router();



// Create Authentication Token  
router.post(
  '/token',
  async (req, res, next) => {
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

      let user = await User.findOne({ phone: req.body.phone });
      if (!user) return res.status(404).json({ message: 'Invalid phone number' });

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

      // Init to generate Authentication JsonWebToken
      const token = user.generateAuthToken()

      


      res.status(201).send({ message: 'True.', token });

    } catch (err) {
      console.log(err)
      res.status(500).json(
        {
          error: err
        }
      );
      next();
    }

  }
);



function validateRequest(req) {
  const schema = Joi.object(
    {
      phone: Joi.string().required(),
      email: Joi.string().email(),
      // password must contains 0-9, a-z, A-Z, signal
      password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,16}$/)
    }
  );

  return schema.validate(req);
}




module.exports = router;