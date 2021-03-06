'use strict';

require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./util/errorHandling');
const { cors_Settings } = require('./util/CORS_settings');
const { morgan_Settings } = require('./util/Logging-Winston_Morgan');
const  validateToken  = require('./util/validateToken');

app.use(validateToken);
app.use(helmet());
app.use(cors(cors_Settings));
app.use(morgan(morgan_Settings));

app.get('/', (req, res) => {
  res.send('Hello, Boilerplate!');
});

app.use('*', (req, res, next) => {
  res.status(404).json({message: 'Resource not Found'});
});

app.use(errorHandler);

module.exports = app;
