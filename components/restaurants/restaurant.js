const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  locationData: {
    address: {
      type: String,
      required: true
    },
    latLng: {
      type: String,
      required: true
    }
  }
});

// create model using previous schema
let Restaurant = mongoose.model('Restaurant', restaurantSchema);

// make this available
module.exports = Restaurant;
