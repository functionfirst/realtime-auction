const mongoose = require('mongoose');

const uristring = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`

const db = mongoose.createConnection(uristring);

module.exports = db;