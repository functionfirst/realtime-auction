var mongoose = require('mongoose');
var db = require('../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Bid = new Schema({
	userid: {
		type: ObjectId
	},
	value: {
		type: Number,
		min: 0
	},
	blocked: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = db.model('Bid', Bid);
