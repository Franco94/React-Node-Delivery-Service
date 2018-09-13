const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Meal = require('./meal');
const AppError = require('../AppError');

router.get('/', (req, res, next) => {

  Meal.find().then((meals) => {
    res.status(200).json(meals);
  }).catch((error) => {
    next(new AppError("Error occurred while retrieving meals", 500));
  });
});

router.get('/:_id', (req, res, next) => {

  if (checkObjectId(req.params._id)) {

    Meal.findById(req.params._id).then((meal) => {
      res.status(200).json(meal);

    }).catch((error) => {
      next(new AppError("Error occurred while retrieving meal", 500));
    });

  } else {

    next(new AppError("Invalid ObjectId format", 400));
  }
});

router.post('/', (req, res, next) => {

  let meal = new Meal(req.body);

  meal.save().then(() => {
    res.status(200).json(meal);

  }).catch((error) => {
    next(new AppError("Invalid meal format", 400));
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
