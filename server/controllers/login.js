'use strict';
var User = require('../models/user');
var uuid = require('node-uuid');

module.exports.register = function(req, res) {
  var userData = req.body;
  User.findOneQ({
    username: userData.username
  }).then(function(existing) {
    if (existing) {
      res.status(409).send('Username already exists');
      return;
    } else {
      userData.token = uuid.v1();
      return User.createQ(userData);
    }
  }).then(function(user) {
    if (user) {
      res.send(user);
    }
  }).done();
};

module.exports.login = function(req, res) {
  var userData = req.body;
  var foundUser;
  User.findOneQ({
    username: userData.username
  }).then(function(user) {
    if (user) {
      foundUser = user;
      return user.comparePassword(userData.password);
    }
  }).then(function(isMatch) {
    if (isMatch === true) {
      foundUser.token = uuid.v1();
      return foundUser.saveQ();
    } else {
      res.status(401).send('Wrong username or password');
      return;
    }
  }).then(function(user) {
    if (user) {
      res.send(user);
    }
  }).done();
};