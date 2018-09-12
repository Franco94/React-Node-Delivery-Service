//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let test = require('tape');
let request = require('supertest');

let app = require('../../app.js');

/* Test the /POST route */
test('POST /user', (assert) => {

  const user = {
    name: "Juan",
    surname: "Perez",
    phone: "2992123456"
  };
  request(app).post('/api/users').send(user).expect(200).expect('Content-Type', /json/).end((err, res) => {
    let actualuser = res.body;

    assert.error(err, 'No error');
    assert.same(actualuser.name, user.name);
    assert.same(actualuser.surname, user.surname);
    assert.same(actualuser.phone, user.phone, 'Create a new user');
    assert.end();
  });
});
