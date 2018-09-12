//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let test = require('tape');
let request = require('supertest');

let app = require('../../app.js');

/* Test the /POST route */
test('POST /restaurant', (assert) => {

  const restaurant = {
    name: "El Gran Lomo",
    locationData: {
      address: "El Gran Lomo, Neuquén, Argentina",
      latLng: "-38.9593239,-68.06940459999998"
    }
  };
  request(app).post('/api/restaurants').send(restaurant).expect(200).expect('Content-Type', /json/).end((err, res) => {
    let actualrestaurant = res.body;

    assert.error(err, 'No error');
    assert.same(actualrestaurant.name, restaurant.name);
    assert.same(actualrestaurant.locationData, restaurant.locationData, 'Create a new restaurant');
    assert.end();
  });
});
