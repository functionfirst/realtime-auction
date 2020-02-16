const { Schema } = require('mongoose');
const { comparePassword, hashPassword } = require('../lib/password');

const db = require('../lib/db');

const User = new Schema({
	name: { type: String, required: true },
	email: { type: String, lowercase: true, required: true, index: { unique: true } },
	password: { type: String, required: true, select: false },
	admin: {
		type: Boolean,
		default: false
	},
	blocked: { type: Boolean, default: true }
}, { timestamps: true });

/**
 * Hashes the password before the user is saved
 */
User.pre('save', function (next) {
	// hash the password only if the password has been changed or user is new
	if (!this.isModified('password')) return next();

	try {
		this.password = hashPassword(this.password);
		next();
	} catch (err) {
		return next(err);
	}
});

/**
 * Compare a given password with the database hash
 */
User.method('isPasswordValid', function (password) {
	return comparePassword(password, this.password);
})

/**
 * Authenticate the user by checking the account is not blocked
 * and that the password is correct
 */
User.method('authenticate', function (password) {
	if (this.blocked) {
		throw new Error('Authentication failed. Error 2.');
	}

	if (!this.isPasswordValid(password)) {
		throw new Error('Authentication failed. Error 3.')
	}
})

module.exports = db.model('User', User);
