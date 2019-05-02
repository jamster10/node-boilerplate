'use strict';

require('dotenv').config();
const app = require('express')();
//require('dotenv').config()
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./config');

const morganOption = NODE_ENV  === 'production' ? 'tiny' : 'dev';
console.log(NODE_ENV);

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

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