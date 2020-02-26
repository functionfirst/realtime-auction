const { Schema } = require('mongoose');
const db = require('../lib/db');
const ObjectId = Schema.Types.ObjectId;

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
	}
}, { timestamps: true });

module.exports = db.model('Autobid', Autobid);
