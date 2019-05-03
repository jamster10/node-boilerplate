'use strict';

require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./config');
const { errorHandler } = require('./util/errorHandling');
const { morgan_Settings, cors_Settings } = require('./util/middlewareSetup.js');


app.use(morgan(morgan_Settings));
app.use(helmet());
app.use(cors(cors_Settings));


app.get('/', (req, res) => {
  res.send('Hello, Boilerplate!');
});

app.use(errorHandler);

module.exports = app;