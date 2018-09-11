# React-Node-Delivery-Service

Restaurant´s delivery service module demonstrating an implementation of a NodeJS backdend API and ReactJS front end client that consumes the API. This module is in charge of taking new orders from the customers via a website. 

## Requirements

* Nodejs 8.x+
* Mongod 3.4.x+

## Usage instructions

1. Google Api Key

  a. Obtain an api key with the [Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/) enabled.

  b. Paste and save the api-key in `config/default.json` in `GOOGLE_API_KEY`.

2. Set-up

  a. `npm install`
  b. `cd .\delivery-service-client\`
  c. `npm install`
  c. `npm run build`
  d. `cd ..`

3. Run local instance of MongoDB.

4. Launch server with `npm run launch`. This will also automatically populate the Mongo database.

## Api
* GET `api/` (test connection)

* GET `api/deliveryOrders` (Get all delivery orders)
* GET `api/deliveryOrders/:_id` (Get delivery order with `_id`)
* POST `api/deliveryOrders` (Create a delivery order)

* GET `api/restaurants` (Get all restaurants)
* GET `api/restaurants/:_id` (Get restaurant with `_id`)
* POST `api/restaurants` (Create a restaurant)

* GET `api/users` (Get all users)
* GET `api/users/:_id` (Get user with `_id`)
* POST `api/users` (Create a user))

* GET `api/meals` (Get all meals)
* GET `api/meals/:_id` (Get meal with `_id`)
* POST `api/meals` (Create a meal)
