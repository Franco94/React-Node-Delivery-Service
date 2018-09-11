//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let DeliveryOrder = require('./deliveryOrder');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('DELIVERY ORDER MODULE TEST', () => {

  //parent block
  describe('Correct execution', () => {

    /*
     * Test the /GET route
     */
    describe('/GET deliveryOrders', () => {

      beforeEach((done) => {
        DeliveryOrder.deleteMany({}, (err) => {
          if (err) {
            thow(new Error("DeliveryOrder delete failed"))
          }
          done();
        });
      });

      it('it should GET all the deliveryOrders', (done) => {
        chai.request(server).get('/api/deliveryOrders').end((err, res) => {
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
    describe('/POST deliveryOrder', () => {
      it('it should POST a deliveryOrder', (done) => {
        let deliveryOrder = {
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
          user: "5b97da7e9bed37331c385967",
          _id: "5b97da7e9bed37331c385868"
        };
        chai.request(server).post('/api/deliveryOrders/').send(deliveryOrder).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('string');
          done();
        });
      });
    });

    /*
   * Test the /GET:id route
   */
    describe('/GET/:_id deliveryOrder', () => {
      it('it should GET deliveryOrder by the given _id', (done) => {
        let _id = '5b97da7e9bed37331c385868';
        chai.request(server).get('/api/deliveryOrders/' + _id).end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('meals');
          res.body.meals[0].should.have.property('name');
          res.body.meals[0].should.have.property('cost');
          res.body.meals[0].should.have.property('quantity');
          res.body.should.have.property('restaurant');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('locationData');
          res.body.locationData.should.have.property('address');
          res.body.locationData.should.have.property('latLng');
          res.body.should.have.property('user');
          res.body.should.have.property('_id').equals(_id);
          done();
        });
      });

    });

  });

  //parent block
  describe('Incorrect execution', () => {

    describe('/GET/:_id deliveryOrder', () => {
      it('it should not GET deliveryOrder by the given incorrect _id', (done) => {
        let _id = '123';
        chai.request(server).get('/api/deliveryOrders/' + _id).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid ObjectId format');
          done();
        });
      });

    });

    describe('/POST deliveryOrder', () => {

      it('it should not POST deliveryOrder (no latLng)', (done) => {
        let deliveryOrder = {
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
            address: "Buenos Aires 1000, Neuquén, Argentina"
          },
          user: "5b97da7e9bed37331c385967"
        };
        chai.request(server).post('/api/deliveryOrders').send(deliveryOrder).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid deliveryOrder format');
          done();
        });
      });

      it('it should not POST deliveryOrder (no meal quantity)', (done) => {
        let deliveryOrder = {
          meals: [
            {
              name: "Burger",
              cost: 10
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
        chai.request(server).post('/api/deliveryOrders').send(deliveryOrder).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid deliveryOrder format');
          done();
        });
      });

      it('it should not POST deliveryOrder (no restaurant)', (done) => {
        let deliveryOrder = {
          meals: [
            {
              name: "Burger",
              cost: 10,
              quantity: 10
            }
          ],
          totalCost: 10,
          restaurant: "123456",
          locationData: {
            address: "Buenos Aires 1000, Neuquén, Argentina",
            latLng: "-38.945270,-68.057540"
          },
          user: "5b97da7e9bed37331c385967"
        };
        chai.request(server).post('/api/deliveryOrders').send(deliveryOrder).end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('message').eql('Invalid ObjectId format');
          done();
        });
      });

    });

  });

});
