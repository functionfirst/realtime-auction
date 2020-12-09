import mongoose from 'mongoose'
import db from '../lib/db.js'

const { Schema } = mongoose
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
	}
}, { timestamps: true });

export default db.model('Bid', Bid);
