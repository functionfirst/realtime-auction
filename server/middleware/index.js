import bodyParser from 'body-parser'
import apiRoutes from '../routes/index.js'
import cors from './cors.js'
import enforceSSL from './enforceSSL.js'

const attachMiddleware = (app, server) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cors)

  app.use(enforceSSL)

  // Load API end points
  app.use('/api', apiRoutes())
}

export default attachMiddleware
