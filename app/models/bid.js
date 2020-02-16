const { Schema } = require('mongoose');
const db = require('../lib/db');
const ObjectId = Schema.Types.ObjectId;

const Bid = new Schema({
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
