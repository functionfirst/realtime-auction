const bodyParser = require('body-parser');
const apiRoutes = require('../routes');
const cors = require('./cors');
const enforceSSL = require('./enforceSSL');

const attachMiddleware = (app, server) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors);

  app.use(enforceSSL);

  // Load API end points
  app.use('/api', apiRoutes());
}

module.exports = attachMiddleware;
