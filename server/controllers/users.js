const User = require('../models/user');
const Auction = require('../models/auction');
const validator = require('validator');

const sendMail = require('../lib/mail/sendMail');
const { newUserSignup } = require('../lib/mail/templates')

// get user information
const userDetails = (req, res) => {
	res.status(200).json(req.decoded);
}

// view all users
const listUsers = async (req, res) => {
	try {
		const users = await User.find({}, null, { sort: 'name' })
		res.status(200).json({ users });
	} catch (err) {
		res.status(400).send(err);
	}
}

// create user
function createUser(req, res) {
	// create new instance of user model
	var user = new User();

	// set the user information (from the request)
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password;

	// VALIDATION
	if (validator.isEmpty(user.name)) {
		return throwValidationError('Please enter your Name.', res);
	}

	if (validator.isEmpty(user.email)) {
		return throwValidationError('Please enter your email address.', res);
	}

	if (validator.isEmpty(user.password)) {
		return throwValidationError('Please enter a password', res);
	}

	if (validator.isEmpty(req.body.confirm_password)) {
		return throwValidationError('Please confirm your password.', res);
	}

	if (!validator.equals(user.password, req.body.confirm_password)) {
		return throwValidationError('Please ensure your passwords match.', res);
	}

	// save user and error check
	user.save(function (err, u) {
		if (err) {
			// check for duplicate user entry
			if (err.code == 11000) {
				return res.json({ success: false, message: 'A User with that email already exists.' });
			} else {
				return res.send(err);
			}
		}

		sendMail(newUserSignup, user);

		res.json({ success: true, message: 'User created' });
	})
};

// Retrieve user
const viewUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);
		res.status(200).json({ user })
	} catch ({ message }) {
		res.status(400).json({ message });
	}
}

// Update single user information
function updateUser(req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) return res.send(err);

		// Update user info if its new
		if (req.body.name) user.name = req.body.name;
		if (req.body.password) user.password = req.body.password;

		// If we just blocked this account we need to remove all of their auctions and autobids
		if (user.blocked !== req.body.blocked && req.body.blocked) {
			clearBidHistory(req.params.user_id);
			clearAutobidHistory(req.params.user_id);
		}

		user.blocked = req.body.blocked;
		user.save(function (err, user) {
			if (err) return res.send(err);

			res.json({ message: "User Updated" });
		})
	})
};

function clearBidHistory(userid) {
	Auction.find({ 'bids.userid': userid }, function (err, auctions) {

		auctions.forEach(function (item) {
			// remove all bids for this user
			item.bids = item.bids.filter(function (obj) {
				if (obj.userid == userid) {
					obj.blocked = true;
				}
				return obj;
			});

			Auction.findByIdAndUpdate(item.id, { bids: item.bids }, { new: true }, function (err, auction) {
				if (err) console.log(err);
			});
		})
	});
}

function clearAutobidHistory(userid) {
	Auction.find({ 'autobids.userid': userid }, function (err, auctions) {
		auctions.forEach(function (item) {
			// remove all bids for this user
			item.autobids = item.autobids.filter(function (obj) {
				if (obj.userid == userid) {
					obj.blocked = true;
				}
				return obj;
			});

			Auction.findByIdAndUpdate(item.id, { autobids: item.autobids }, { new: true }, function (err, auction) {
				if (err) console.log(err);
			});
		})
	});
}

function throwValidationError(msg, res) {
	return res.json({
		success: false,
		message: msg
	});
}

module.exports = {
	createUser,
	listUsers,
	userDetails,
	updateUser,
	viewUser
}
