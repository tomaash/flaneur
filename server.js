'use strict';
var mongoose = require('mongoose-q')();
var baucis = require('baucis');
var express = require('express');
var jsonParser = require('body-parser').json();

var Trip = require('./server/models/trip');

var mw = require('./server/controllers/middleware');
var loginController = require('./server/controllers/login');

var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/flaneur');

var tripsController = baucis.rest('Trip');
tripsController.request([mw.authenticate, mw.addUserId]);
tripsController.query('get', mw.addUserCondition);

app.post('/api/register', jsonParser, loginController.register);
app.post('/api/login', jsonParser, loginController.login);

// Create the app 
var port = process.env.PORT || 5000;
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/dist'));
app.use('/api', baucis());

app.listen(port, function() {
	console.log('Express (' + app.get('env') + ') server listening on port ' + port);
});