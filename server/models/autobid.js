import mongoose from 'mongoose'
import db from '../lib/db.js'

const { Schema } = mongoose
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

export default db.model('Autobid', Autobid);
