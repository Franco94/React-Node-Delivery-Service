const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  locationData: {
    address: String,
    latLng: String
  }
});

// create model using previous schema
let Restaurant = mongoose.model('Restaurant', restaurantSchema);

// make this available
module.exports = Restaurant;
