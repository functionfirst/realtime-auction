import cors from 'cors'
import { corsAllowedList } from '../lib/env.js'

const options = {
  origin: function (origin, callback) {
    if (corsAllowedList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default cors(options)
