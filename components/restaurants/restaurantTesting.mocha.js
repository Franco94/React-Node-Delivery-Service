//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Restaurant = require('./restaurant');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('RESTAURANT MODULE TEST', () => {

  //parent block
  describe('Correct execution', () => {

    /*
     * Test the /GET route
     */
    describe('/GET restaurants', () => {

      beforeEach((done) => {
        Restaurant.deleteMany({}, (err) => {
          if (err) {
            thow(new Error("Restaurant delete failed"))
          }
          done();
        });
      });

      it('it should GET all the restaurants', (done) => {
        chai.request(server).get('/api/restaurants').end((err, res) => {
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
    describe('/POST restaurant', () => {
      it('it should POST a restaurant', (done) => {
        let restaurant = {
          name: "El Gran Lomo",
          locationData: {
            address: "El Gran Lomo, Neuquén, Argentina",
            latLng: "-38.9593239,-68.06940459999998"
          },
          _id: '5b97da7e9bed37331c385868'
        };
        chai.request(server).post('/api/restaurants/').send(restaurant).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(restaurant.name);
          res.body.should.have.property('locationData').eql(restaurant.locationData);
          res.body.locationData.should.have.property('address').eql(restaurant.locationData.address);
          res.body.locationData.should.have.property('latLng').eql(restaurant.locationData.latLng);
          done();
        });
      });
    });

    /*
   * Test the /GET:id route
   */
    describe('/GET/:_id restaurant', () => {
      it('it should GET restaurant by the given _id', (done) => {
        let _id = '5b97da7e9bed37331c385868';
        chai.request(server).get('/api/restaurants/' + _id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('locationData');
          res.body.locationData.should.have.property('address');
          res.body.locationData.should.have.property('latLng');
          res.body.should.have.property('_id').equals(_id);
          done();
        });
      });

    });

  });

  //parent block
  describe('Incorrect execution', () => {

    describe('/GET/:_id restaurant', () => {
      it('it should not GET restaurant by the given incorrect _id', (done) => {
        let _id = '123';
        chai.request(server).get('/api/restaurants/' + _id).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid ObjectId format');
          done();
        });
      });

    });

    describe('/POST restaurant', () => {

      it('it should not POST restaurant (no latLng)', (done) => {
        let restaurant = {
          name: "El Gran Lomo",
          locationData: {
            address: "El Gran Lomo, Neuquén, Argentina"
          }
        };
        chai.request(server).post('/api/restaurants').send(restaurant).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid restaurant format');
          done();
        });
      });

    });

  });

});
