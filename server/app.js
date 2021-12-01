const express = require('express');
const usersRouter = require('./routes/api/users');
const ratingsRouter = require('./routes/api/ratings')
const { urlencoded, json } = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const databaseString =
  process.env.DB_STING || 'mongodb://localhost:27017/users';

mongoose.connect(databaseString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', function () {
  console.log('Uspesno povezivanje!');
});

mongoose.connection.on('error', (error) => {
  console.log('Greska: ', error);
});

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/users', usersRouter);
app.use('/api/ratings', ratingsRouter);

app.use(function (req, res, next) {
  const error = new Error('Zahtev nije podrzan!');
  error.status = 405;

  next(error);
});

app.use(function (error, req, res, next) {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode,
      stack: error.stack,
    },
  });
});

module.exports = app;
