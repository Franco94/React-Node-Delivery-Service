//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Meal = require('./meal');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('MEAL MODULE TEST', () => {

  //parent block
  describe('Correct execution', () => {

    /*
     * Test the /GET route
     */
    describe('/GET meals', () => {

      beforeEach((done) => {
        Meal.deleteMany({}, (err) => {
          if (err) {
            thow(new Error("Meal delete failed"))
          }
          done();
        });
      });

      it('it should GET all the meals', (done) => {
        chai.request(server).get('/api/meals').end((err, res) => {
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
    describe('/POST meal', () => {
      it('it should POST a meal', (done) => {
        let meal = {
          _id: "5b97da7e9bed37331c385868",
          name: "Burger",
          cost: 10
        };
        chai.request(server).post('/api/meals/').send(meal).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(meal.name);
          res.body.should.have.property('cost').eql(meal.cost);
          done();
        });
      });
    });

    /*
   * Test the /GET:id route
   */
    describe('/GET/:_id meal', () => {
      it('it should GET meal by the given _id', (done) => {
        let _id = '5b97da7e9bed37331c385868';
        chai.request(server).get('/api/meals/' + _id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').equals(_id);
          done();
        });
      });

    });

  });

  //parent block
  describe('Incorrect execution', () => {

    describe('/GET/:_id meal', () => {
      it('it should not GET meal by the given incorrect _id', (done) => {
        let _id = '123';
        chai.request(server).get('/api/meals/' + _id).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid ObjectId format');
          done();
        });
      });

    });

    describe('/POST meal', () => {

      it('it should not POST meal (no cost)', (done) => {
        let meal = {
          name: "Burger"
        };
        chai.request(server).post('/api/meals').send(meal).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid meal format');
          done();
        });
      });

    });

  });

});
