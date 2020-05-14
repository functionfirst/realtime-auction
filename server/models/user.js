const { Schema } = require('mongoose');
const { comparePassword, hashPassword } = require('../lib/password');

const db = require('../lib/db');

const fields = {
	name: {
		type: String,
		required: [true, 'User name is required']
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, 'User email is required'],
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: [true, 'User password is required'],
		select: false
	},
	admin: {
		type: Boolean,
		default: false
	},
	blocked: {
		type: Boolean,
		default: true
	}
}

const options = {
	timestamps: true
}

const User = new Schema(fields, options);

/**
 * Hashes the password before the user is saved
 */
User.pre('save', function (next) {
	try {
		if (this.isModified('password')) {
			this.password = hashPassword(this.password);
		}
	} catch (err) {
		return next(err);
	}

	next();
});

/**
 * Returns errors when user model is saved
 */
User.post('save', function (error, doc, next) {
	if (error.name === 'MongoError' && error.code === 11000) {
		error = ['A User with that email already exists']
	} else {
		if (error.errors) {
			error = Object.values(error.errors).map(e => e.message)
		}
	}

	next(error);
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
