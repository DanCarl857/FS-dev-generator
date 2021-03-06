// Import Libraries
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Import Routes
const fibonacciRoutes = require('./api/routes/fibonacci.routes');
const factorialRoutes = require('./api/routes/factorial.routes');
const primeRoutes = require('./api/routes/prime.routes');
const rangeRoutes = require('./api/routes/range.routes');
const partialSumRoutes = require('./api/routes/partialSum.routes');

// Configure Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
      return res.status(200).json({});
  }
  next();
});

// Routes to handle requests
app.use('/fibonacci', fibonacciRoutes);
app.use('/factorial', factorialRoutes);
app.use('/prime', primeRoutes);
app.use('/range', rangeRoutes);
app.use('/partial', partialSumRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});

module.exports = app;