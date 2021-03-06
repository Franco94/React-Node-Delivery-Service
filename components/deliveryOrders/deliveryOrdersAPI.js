const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const DeliveryOrder = require('./deliveryOrder');
const Restaurant = require('../restaurants/restaurant');
const AppError = require('../AppError');

router.get('/', (req, res, next) => {

  DeliveryOrder.find().then((deliveryOrders) => {
    res.status(200).json(deliveryOrders);
  }).catch((error) => {
    next(new AppError("Error occurred while retrieving orders", 500));
  });
});

router.get('/:_id', (req, res, next) => {

  if (checkObjectId(req.params._id)) {

    DeliveryOrder.findById(req.params._id).then((deliveryOrder) => {
      res.status(200).json(deliveryOrder);

    }).catch((error) => {
      next(new AppError("Error occurred while retrieving order", 500));
    });

  } else {
    next(new AppError("Invalid ObjectId format", 400));
  }
});

router.post('/', (req, res, next) => {

  const restoId = req.body.restaurant;

  getRestaurant(restoId).then((resto) => {

    let deliveryOrder = new DeliveryOrder(req.body);

    deliveryOrder.save().then(() => {

      deliveryOrder.calculateEta(resto.locationData.latLng, deliveryOrder.locationData.latLng).then((eta) => {

        res.status(200).json(eta);

      }).catch((error) => {
        //most likely google api key not working
        next(new AppError(error.message, 500));

      });

    }).catch((error) => {
      next(new AppError("Invalid deliveryOrder format", 400));

    });
  }).catch((error) => {
    //getRestaurant failed
    next(error);
  });
});

const getRestaurant = ((restoId) => {

  // return new pending promise
  return new Promise((resolve, reject) => {

    if (checkObjectId(restoId)) {

      Restaurant.findById(restoId).then((resto) => {

        if (resto) {
          resolve(resto);

        } else {
          reject(new AppError("Restaurant with id " + restoId + " does not exist", 404));
        }
      }).catch((error) => {
        reject(new AppError("Error occurred while retrieving restaurant", 500));
      });
    } else {
      reject(new AppError("Invalid ObjectId format", 400));
    }
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
