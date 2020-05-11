const cors = require('cors');
const { corsAllowedList } = require('../lib/env');

const options = {
  origin: function (origin, callback) {
    if (corsAllowedList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(options)
