'use strict';

var app = require('./server/app');
var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log('Express (' + app.get('env') + ') server listening on port ' + port);
});