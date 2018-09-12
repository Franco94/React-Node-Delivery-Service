//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let test = require('tape');
let request = require('supertest');

let app = require('../../app.js');

/* Test the /POST route */
test('POST /deliveryOrder', (assert) => {

  const deliveryOrder = {
    meals: [
      {
        name: "Burger",
        cost: 10,
        quantity: 10
      }
    ],
    restaurant: "5b97d8a4d7ffff56907188f9",
    totalCost: 10,
    locationData: {
      address: "Buenos Aires 1000, Neuquén, Argentina",
      latLng: "-38.945270,-68.057540"
    },
    user: "5b97da7e9bed37331c385967"
  };
  request(app).post('/api/deliveryOrders').send(deliveryOrder).expect(200).expect('Content-Type', /json/).end((err, res) => {
    let eta = res.body;

    assert.error(err, 'No error');
    assert.equal(typeof eta, 'string', 'it should return an string');
    assert.end();
  });
});
