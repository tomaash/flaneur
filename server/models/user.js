'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var jsonSelect = require('mongoose-json-select');
var Q = require('q');

var User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

User.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function(candidatePassword) {
  var def = Q.defer();
  if (!candidatePassword) {
    console.log('compare called without password');
    def.resolve(false);
  }
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      def.reject(err);
    } else {
      def.resolve(isMatch);
    }
  });
  return def.promise;
};

User.plugin(jsonSelect, '-__v -password');

module.exports = mongoose.model('User', User);