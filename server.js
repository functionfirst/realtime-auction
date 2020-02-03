// BASE SETUP
// ======================================
var express = require('express'),
	app = express(),
	http = require('http'),
	bodyParser = require('body-parser'),
	path = require('path'),
	apiRoutes = require('./app/routes/api')(app, express),
	handleCORS = require('./app/lib/cors'),
	enforceSSL = require('./app/lib/enforceSSL'),
	multerUploads = require('./app/lib/enforceSSL'),
	port = process.env.PORT || 8080,
	httpServer,
	socket;

// APP CONFIGURATION --------------------
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Handle CORS requests
app.use(handleCORS);

// Enforce SSL on production server
app.use(enforceSSL);

// MULTER
// Image uploads
app.use(multerUploads);

// STATIC FILES
// Used for front-end requests
app.use(express.static(__dirname + '/public'));

// API
// Load API end points
app.use('/api', apiRoutes);

// MAIN ROUTE
// Serves front-end to users
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START SERVER
httpServer = http.createServer(app);
httpServer.listen(port);

// SETUP SOCKET BROADCASTS
socket = require('./app/lib/io')(httpServer);

console.log('All the magic happens on port ' + port);