'use strict';
var mongoose = require('mongoose-q')();
var baucis = require('baucis');
var express = require('express');
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;
var jsonParser = require('body-parser').json();

var bearerAuth = require('./server/models/bearer_auth');
var User = require('./server/models/user');

var app = express();

if (app.get('env') === 'development') {
	mongoose.connect('mongodb://localhost/flaneur');
} else {
	mongoose.connect('mongodb://root:notsosecret1234@ds051947.mongolab.com:51947/flaneur');
}

var Trip = new mongoose.Schema({
	destination: String,
	startDate: Date,
	endDate: Date,
	comment: String
});

mongoose.model('trip', Trip);

var tripsController = baucis.rest('trip');
tripsController.request(bearerAuth.authenticate('bearer', {
		session: false
	}));
// baucis.rest('User');

app.post('/api/register', jsonParser, function(req, res) {
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
});

app.post('/api/login', jsonParser, function(req, res) {
	var userData = req.body;
	var foundUser;
	User.findOneQ({
		username: userData.username
	}).then(function(user) {
		if (user) {
			foundUser = user;
			return user.comparePassword(userData.password)
		}
	}).then(function(isMatch) {
		if (isMatch) {
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
});


// Create the app and listen for API requests

var port = process.env.PORT || 5000;

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/', express.static(__dirname + '/dist'));

app.use('/api', baucis());

app.listen(port, function() {
	console.log('Express (' + app.get('env') + ') server listening on port ' + port);
});