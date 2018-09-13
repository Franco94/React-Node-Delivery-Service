// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('config');
//custom error
const AppError = require('./components/AppError');

let app = express();

// Get API routes
const routes = require('./components/index');

//database connection
const db = require('./model/db');

// configure app
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//set route to react build
app.use(express.static(path.join(__dirname, 'delivery-service-client/build')));

// configure app to use bodyParser()
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set our api routes
app.use('/api', routes);

// Catch all other routes
app.get('*', (req, res, next) => {
  next(new AppError("Route Not Found", 404));
});

//error handler
app.use((err, req, res, next) => {

  if (config.util.getEnv('NODE_ENV') !== "test") {
    console.log(err.message);
    // Log error message in console
    console.error(err.stack);
  }
  //HTTP requests response
  res.status(err.status).json({
    'errors': {
      message: err.message,
      error: err
    }
  });

});

module.exports = app;
