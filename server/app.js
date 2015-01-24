'use strict';
var mongoose = require('mongoose-q')();
var baucis = require('baucis');
var express = require('express');
var jsonParser = require('body-parser').json();

var Trip = require('./models/trip');

var mw = require('./controllers/middleware');
var loginController = require('./controllers/login');

var app = express();

if (app.get('env') === 'development') {
	mongoose.connect('mongodb://localhost/flaneur');
} else {
	mongoose.connect('mongodb://root:notsosecret1234@ds051947.mongolab.com:51947/flaneur');
}

var tripsController = baucis.rest('Trip');
tripsController.request([mw.authenticate, mw.addUserId]);
tripsController.query('get', mw.addUserCondition);
// tripsController.request('post', mw.addUserId);

app.post('/api/register', jsonParser, loginController.register);
app.post('/api/login', jsonParser, loginController.login);

// Create the app 
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/dist'));
app.use('/api', baucis());

module.exports = app;