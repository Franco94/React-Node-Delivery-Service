const express = require('express');
const router = express.Router();

const deliveryOrderRoutes = require('./deliveryOrders/deliveryOrdersAPI');
const restaurantRoutes = require('./restaurants/restaurantsAPI');
const userRoutes = require('./users/usersAPI');
const mealRoutes = require('./meals/mealsAPI');

//routes definition

router.get('/', (req, res) => {

  res.status(200).json({message: 'connected to delivery api'});

});

router.use('/deliveryOrders', deliveryOrderRoutes);

router.use('/restaurants', restaurantRoutes);

router.use('/users', userRoutes);

router.use('/meals', mealRoutes);

module.exports = router;
