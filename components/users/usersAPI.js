const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const User = require('./user');
const AppError = require('../AppError');

router.get('/', (req, res, next) => {
  User.find().then((users) => {
    res.status(200).json(users);
  }).catch((error) => {
    next(new AppError("Not Found", 404));
  });
});

router.get('/:_id', (req, res, next) => {

  if (checkObjectId(req.params._id)) {

    User.findById(req.params._id).then((user) => {
      res.status(200).json(user);

    }).catch((error) => {
      next(new AppError("Not Found", 404));
    });

  } else {

    next(new AppError("Invalid ObjectId format", 400));
  }
});

router.post('/', (req, res, next) => {

  let user = new User(req.body);

  user.save().then(() => {
    res.status(200).json(user);

  }).catch((error) => {
    next(new AppError("Invalid user format", 400));
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
