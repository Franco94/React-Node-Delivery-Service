// Bring Mongoose into the app
const mongoose = require('mongoose');

const config = require('config');
const mealData = require('../mockdata/mealData.json');
const restaurantData = require('../mockdata/restaurantData.json');

//database direction
const dbURI = config.get('DBHost');

//Set up default mongoose connection
//connect to our database
mongoose.connect(dbURI, {
  keepAlive: true,
  reconnectTries: 10,
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

//connection messages
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('Connected to database: ' + dbURI);
  loadDatabase();
});
db.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

//load mock data
const loadDatabase = (() => {

  let Meal = mongoose.model('Meal');
  let Restaurant = mongoose.model('Restaurant');

  // clear all existing documents from the collections
  // and populate the collections from json data
  Meal.deleteMany().then(() => {

    for (let i = 0; i < mealData.length; i++) {
      new Meal(mealData[i]).save();
    }

  }).catch((error) => {
    next(error);
  });

  Restaurant.deleteMany().then(() => {

    for (let i = 0; i < restaurantData.length; i++) {
      new Restaurant(restaurantData[i]).save();
    }
  }).catch((error) => {
    next(error);
  });
});
