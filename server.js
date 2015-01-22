'use strict';
var mongoose = require('mongoose');
var baucis = require('baucis');
var express = require('express');

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

baucis.rest('trip');
// Create the app and listen for API requests

var port = process.env.PORT || 5000;

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/', express.static(__dirname + '/dist'));

app.use('/api', baucis());

app.listen(port, function() {
	console.log('Express (' + app.get('env') + ') server listening on port ' + port);
});