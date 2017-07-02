var mongoose    = require('mongoose');
var config      = require('../../config');

var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                'mongodb://' + config.db.host + '/' +config.db.name;

var db = mongoose.createConnection(uristring);

module.exports = db;