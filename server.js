// BASE SETUP
// ======================================
var express = require('express'),
	app = express(),
	http = require('http'),
	bodyParser = require('body-parser'),
	apiRoutes = require('./app/routes/api')(app, express),
	cors = require('cors'),
	enforceSSL = require('./app/lib/enforceSSL'),
	multerUploads = require('./app/lib/enforceSSL'),
	port = process.env.PORT || 8080,
	httpServer,
	socket;

// APP CONFIGURATION --------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Enforce SSL on production server
app.use(enforceSSL);

// MULTER
// Image uploads
app.use(multerUploads);


// API
// Load API end points
app.use('/api', apiRoutes);

// START SERVER
httpServer = http.createServer(app);
httpServer.listen(port);

// SETUP SOCKET BROADCASTS
socket = require('./app/lib/io')(httpServer);

console.log('All the magic happens on port ' + port);
