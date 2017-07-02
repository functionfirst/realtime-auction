// BASE SETUP
// ======================================

// CALL PACKAGES ------------------------
var express 			= require('express');
var app 					= express();
var http 					= require('http');
var bodyParser 		= require('body-parser');
var config 				= require('./config');
var path 					= require('path');
var apiRoutes 		= require('./app/routes/api')(app, express);
var handleCORS  	= require('./app/lib/cors');
var enforceSSL  	= require('./app/lib/enforceSSL');

// APP CONFIGURATION --------------------
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Handle CORS requests
app.use(handleCORS);

// Enforce SSL on production server
app.use(enforceSSL);

// STATIC FILES
// Used for front-end requests
app.use(express.static(__dirname + '/public'));

// API ROUTES
app.use('/api', apiRoutes);

// MAIN ROUTE
// Serves front-end to users
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
var port = process.env.PORT || config.port || 8080;
server = http.createServer(app);
server.listen(port);

var io = require('./app/lib/io')(server);

console.log('All the magic happens on port ' + port);