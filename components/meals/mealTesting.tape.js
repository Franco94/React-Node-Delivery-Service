//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let test = require('tape');
let request = require('supertest');

let app = require('../../app.js');

/* Test the /POST route */
test('POST /meal', (assert) => {

  const meal = {
    name: "Burger",
    cost: 10
  };
  request(app).post('/api/meals').send(meal).expect(200).expect('Content-Type', /json/).end((err, res) => {
    let actualMeal = res.body;

    assert.error(err, 'No error');
    assert.same(actualMeal.name, meal.name);
    assert.same(actualMeal.cost, meal.cost, 'Create a new meal');
    assert.end();
  });
});
