'use strict';

const { NODE_ENV } = require('../config');
//For Morgan whitelist
const whitelist = ['http://localhost:3000', 'http://my-project.com'];

module.exports = {
  cors_Settings: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },

  morgan_Settings: NODE_ENV  === 'production' ? 'tiny' : 'dev',
};