const mongoose = require('mongoose');
const config = require('config');
const distance = require('google-distance-matrix');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const deliveryOrderSchema = new Schema({

  meals: [
    {
      name: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }

  ],

  restaurant: {
    type: Schema.ObjectId,
    ref: "Restaurant",
    required: true
  },

  totalCost: {
    type: Number
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
  },

  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  }
});

/**
 * Calculates estimated time of arrival to a location from another.
 * @param {string} origin lat,Lng coordinates of the starting location.
 * @param {string} destination lat,Lng coordinates of the end location.
 * @returns {string} The estimated time of arrival to destination from origin.
 */
deliveryOrderSchema.methods.calculateEta = ((origin, destination) => {

  const origins = [origin];
  const destinations = [destination];

  //set up google api key
  const apiKey = config.get('GOOGLE_API_KEY');
  distance.key(apiKey);

  distance.departure_time("now");
  distance.mode('driving');

  // return new pending promise
  return new Promise((resolve, reject) => {

    distance.matrix(origins, destinations, ((err, distances) => {
      if (err) {
        reject(err);
      }
      if (!distances) {
        reject(new Error('no distances'));
      }
      if (distances.status == 'OK') {
        if (distances.rows[0].elements[0].status == 'OK') {
          let duration = distances.rows[0].elements[0].duration.text;
          resolve(duration);

        } else {
          reject(new Error(destination + ' is not reachable by land from ' + origin));
        }
      } else {

        reject(new Error(distances.error_message));
      }

    }));
  });

});

// create model using previous schema
let DeliveryOrder = mongoose.model('DeliveryOrder', deliveryOrderSchema);

// make this available
module.exports = DeliveryOrder;
