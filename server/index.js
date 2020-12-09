import express from 'express'
import http from 'http'

import attachMiddleware from './middleware/index.js'
import socketIO from './lib/io.js'
import { port } from './lib/env.js'

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
