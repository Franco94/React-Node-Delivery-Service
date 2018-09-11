const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Restaurant = require('./restaurant');
const AppError = require('../AppError');

router.get('/', (req, res) => {
  Restaurant.find().then((restaurants) => {
    res.status(200).json(restaurants);
  }).catch((error) => {
    next(new AppError("Not Found", 404));
  });
});

router.get('/:_id', (req, res) => {

  if (checkObjectId(req.params._id)) {

    Restaurant.findById(req.params._id).then((restaurant) => {
      res.status(200).json(restaurant);

    }).catch((error) => {
      next(new AppError("Not Found", 404));
    });

  } else {

    next(new AppError("Invalid ObjectId format", 400));
  }
});

router.post('/', (req, res) => {

  let restaurant = new Restaurant(req.body);

  restaurant.save().then(() => {
    res.status(200).json(restaurant);

  }).catch((error) => {
    next(new AppError("Invalid restaurant format", 400));
  });

});

// verifies correct format of object id
const checkObjectId = ((id) => {

  let valid = false;

  if (ObjectId.isValid(id)) {

    let test = new ObjectId(id);

    if (test == id) {
      valid = true;

    }
  }

  return valid;
});

module.exports = router;
