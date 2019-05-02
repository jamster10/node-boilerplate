'use strict';

require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./config');

const morganOption = NODE_ENV  === 'production' ? 'tiny' : 'dev';


app.use(morgan(morganOption));
app.use(helmet());

const whitelist = ['http://localhost:3000', 'http://my-project.com'];
const options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, Boilerplate!');
});

app.use(function errorHandler(err, req, res){
  let response;
  if( NODE_ENV === 'production'){
    response = {error: { message: 'Server Error'}};
  } else {
    console.log(err);
    response = {message: err.message, err};
  }
  res.status(500).json(response);
});

module.exports = app;