const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const mealSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  cost: {
    type: Number,
    required: true
  },

  img: {
    type: String
  }

});

// create model using previous schema
let Meal = mongoose.model('Meal', mealSchema);

// make this available
module.exports = Meal;
