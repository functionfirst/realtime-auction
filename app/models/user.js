const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const db = require('../lib/db');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { type: String, required: true },
	pobox: String,
	address: String,
	city: String,
	mobile: String,
	email: { type: String, lowercase: true, required: true, index: { unique: true } },
	password: { type: String, required: true, select: false },
	admin: {
		type: Boolean,
		default: false
	},
	image: {
		type: String
	},
	blocked: { type: Boolean, default: true }
});

/**
 * Hashes the password before the user is saved
 */
UserSchema.pre('save', function (next) {
	// hash the password only if the password has been changed or user is new
	if (!this.isModified('password')) return next();

	try {
		this.password = bcrypt.hash(this.password);
		next();
	} catch (err) {
		return next(err);
	}
});

/**
 * method to compare a given password with the database hash
 */
UserSchema.methods.isPasswordValid = function (password) {
	return bcrypt.compareSync(password, this.password);
};

}

// return model
module.exports = db.model('User', UserSchema);
