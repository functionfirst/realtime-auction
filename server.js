// BASE SETUP
// ======================================

// CALL PACKAGES ------------------------
var express 	= require('express');
var app 		= express();
var http 		= require('http');
var bodyParser 	= require('body-parser');
var db 			= require('./app/lib/db');
var config 		= require('./config');
var path 		= require('path');

// APP CONFIGURATION --------------------
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

// Force ssl on production server
if(process.env.NODE_ENV === 'production') {
	app.use(function (req, res, next) {
	    if (req.headers['x-forwarded-proto'] !== 'https') {
	        return res.redirect(['https://', req.get('Host'), req.url].join(''));
	    }
	    return next();
	});
}

// STATIC FILES
// Used for front-end requests
app.use(express.static(__dirname + '/public'));

// API ROUTES
var apiRoutes = require('./app/routes/api')(app, express);
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