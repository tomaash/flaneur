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
    if (Object.getOwnPropertyNames(doc.incoming).length === 0) {
      res.status(409).send('Cannot save empty object');
      console.log('Empty object filtered out from saving');
      return;
    }
    doc.incoming.user = req.user._id;
    console.log(doc.incoming);
    callback(null, doc);
  });
  next();
};

module.exports.authenticate = bearerAuth.authenticate('bearer', {
  session: false
});