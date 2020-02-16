const mongoose = require('mongoose');
const db = require('../lib/db');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Autobid = new Schema({
	userid: {
		type: ObjectId
	},
	email: {
		type: String
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

module.exports = db.model('Autobid', Autobid);
