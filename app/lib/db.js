var mongoose    = require('mongoose');
var config      = require('../../config');

var uristring = process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL ||
                'mongodb://' + config.db.host + '/' +config.db.name;

var db = mongoose.connect(uristring, function(err, res) {
	if (err) {
  		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	}

    console.log ('Succeeded connected to: ' + uristring);
});


// Connect to DB
module.exports = db;