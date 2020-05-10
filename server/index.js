const express = require('express');
const http = require('http');

const attachMiddleware = require('./middleware');
const socketIO = require('./lib/io');
const { port } = require('./lib/env');

// START SERVER
const server = http.createServer();
const app = express();

app.set('port', port);

attachMiddleware(app, server);

server.on('request', app);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

// SETUP SOCKET BROADCASTS
socketIO(server)
