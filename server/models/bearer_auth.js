'use strict';
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('./user');

passport.use(new BearerStrategy(function(token, done) {
  return User.findOne({
    token: token
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user, {
      scope: 'all'
    });
  });
}));

module.exports = passport;