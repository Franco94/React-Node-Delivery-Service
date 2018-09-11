//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let User = require('./user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('USER MODULE TEST', () => {

  //parent block
  describe('Correct execution', () => {

    /*
     * Test the /GET route
     */
    describe('/GET users', () => {

      beforeEach((done) => {
        User.deleteMany({}, (err) => {
          if (err) {
            thow(new Error("User delete failed"))
          }
          done();
        });
      });

      it('it should GET all the users', (done) => {
        chai.request(server).get('/api/users').end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });

    /*
     * Test the /POST route
     */
    describe('/POST user', () => {
      it('it should POST a user', (done) => {
        let user = {
          name: "Juan",
          surname: "Perez",
          phone: "2992123456",
          _id: '5b97da7e9bed37331c385868'
        };
        chai.request(server).post('/api/users/').send(user).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(user.name);
          res.body.should.have.property('surname').eql(user.surname);
          res.body.should.have.property('phone').eql(user.phone);
          done();
        });
      });
    });

    /*
   * Test the /GET:id route
   */
    describe('/GET/:_id user', () => {
      it('it should GET user by the given _id', (done) => {
        let _id = '5b97da7e9bed37331c385868';
        chai.request(server).get('/api/users/' + _id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('surname');
          res.body.should.have.property('phone');
          res.body.should.have.property('_id').equals(_id);
          done();
        });
      });

    });

  });

  //parent block
  describe('Incorrect execution', () => {

    describe('/GET/:_id user', () => {
      it('it should not GET user by the given incorrect _id', (done) => {
        let _id = '123';
        chai.request(server).get('/api/users/' + _id).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid ObjectId format');
          done();
        });
      });

    });

    describe('/POST user', () => {

      it('it should not POST user (no surname)', (done) => {
        let user = {
          name: "Juan",
          phone: "2992123456"
        };
        chai.request(server).post('/api/users').send(user).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid user format');
          done();
        });
      });

    });

  });

});
