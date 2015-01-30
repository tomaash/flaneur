'use strict';
var mongoose = require('mongoose');
var User = require('./user');

var Trip = new mongoose.Schema({
  destination: String,
  startDate: Date,
  endDate: Date,
  comment: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Trip', Trip);