/*
 *  Author: Gavin
 *  routes/genres.js
 */
const Admin = require('../middleware/Admin');
const Auth = require('../middleware/Auth');
const { Genre, validateGenre } = require('../models/Genre');
const bodyParer = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Get all genres
router.get(
  '/',
  async (req, res) => {
    try {

      const genres = await Genre.find().sort({ name: 1 });
      res.send(genres);
      console.log(genres);

    } catch (err) {
      res.status(500).send('Something failed');
    }

  }
);

// Get genre by id
router.get(
  '/:id',
  async (req, res) => {
    try {

      const genre = await Genre.findById(req.params.id);
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);

    } catch (err) {
      res.status(500).send('Something failed');
    }

  }
);



// Create genres
router.post(
  '/',
  [Auth, Admin],
  async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre(
      {
        name: req.body.name,
      }
    );

    try {
      const check = await Genre.find({ name: req.body.name});
      if (check.length > 0) return res.status(409).send('The name already exists');
      
      genre = await genre.save();
      res.send(genre);

    } catch (err) {
      for (field in err)
        console.log(field.message);
    }
  }
);

// Update the genre
router.put(
  '/:id',
  async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

      const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        {
          new: true
        }
      );

      if (!genre) return res.status(404).send('The genre with the given ID was not found.');

      res.send(genre);

    } catch (err) {
      for (field in err)
        console.log(field.message);
    }

  }
);

// Delete the genre
router.delete(
  '/:id',
  [Auth, Admin],
  async (req, res) => {
    try {

      const genre = await Genre.findByIdAndDelete(req.params.id);

      if (!genre) return res.status(404).send('The genre with the given ID was not found.');

      res.send(genre);

    } catch (err) {
      for (field in err)
        console.log(field.message);
    }

  }
);


module.exports = router;