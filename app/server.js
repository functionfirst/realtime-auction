const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');

const app = express();

const apiRoutes = require('./routes')(app, express);
const enforceSSL = require('./middleware/enforceSSL');
const multerUploads = require('./lib/multer');
const socketIO = require('./lib/io');
const port = process.env.PORT || 8080;

// APP CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(enforceSSL);

// Use multer for Image uploads
app.use(multerUploads);

// Load API end points
app.use('/api', apiRoutes);

// START SERVER
let httpServer = http.createServer(app);
httpServer.listen(port);

// SETUP SOCKET BROADCASTS
socketIO(httpServer)
