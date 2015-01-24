'use strict';
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

var bearerAuth = passport.use(new BearerStrategy(function(token, done) {
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

module.exports.addUserCondition = function(req, res, next) {
	req.baucis.query._conditions.user = req.user._id;
	next();
};

module.exports.addUserId = function(req, res, next) {
	req.baucis.incoming(function(doc, callback) {
		doc.incoming.user = req.user._id;
		callback(null, doc);
	});
	next();
};

module.exports.authenticate = bearerAuth.authenticate('bearer', {
	session: false
});