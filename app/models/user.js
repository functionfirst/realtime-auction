const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const db = require('../lib/db');
const Schema = mongoose.Schema;

var User = new Schema({
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
User.pre('save', function (next) {
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
User.methods.isPasswordValid = function (password) {
	return bcrypt.compareSync(password, this.password);
};

/**
 * Authenticate the user by checking the account is not blocked
 * and that the password is correct
 */
User.methods.authenticate = function (password) {
	if (this.blocked) {
		throw new Error('Authentication failed. Error 2.');
	}

	if (!this.isPasswordValid(password)) {
		throw new Error('Authentication failed. Error 3.')
	}
}

module.exports = db.model('User', User);
