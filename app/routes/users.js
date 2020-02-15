const User = require('../models/user');
const Auction = require('../models/auction');
const S3FS = require('s3fs');
const fs = require('fs');
const validator = require('validator');

const sendMail = require('../lib/mail/sendMail');
const { newUserSignup } = require('../lib/mail/templates')


// Check AWS bucket is configured
if (process.env.AWS_BUCKET) {
	// S3FS implementation
	s3fsImpl = new S3FS(process.env.S3_BUCKET, {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});
}

// get user information
const me = (req, res) => {
	res.send(req.decoded);
}

// view all users
const list = async (req, res) => {
	try {
		const users = await User.find({}, null, { sort: 'name' })
		res.status(200).json({ users });
	} catch (err) {
		res.status(400).send(err);
	}
}

// create user
function create(req, res) {
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
const view = async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id);
		res.status(200).json({ user })
	} catch ({ message }) {
		res.status(400).json({ message });
	}
}

// Update single user information
function update(req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) return res.send(err);

		// Update user info if its new
		if (req.body.name) user.name = req.body.name;
		if (req.body.password) user.password = req.body.password;
		if (req.body.removeImage) user.image = '';

		user.pobox = req.body.pobox;
		user.address = req.body.address;
		user.city = req.body.city;
		user.mobile = req.body.mobile;

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

function upload(req, res) {
	// Upload image
	var file = req.file;

	// Create file stream
	var stream = fs.createReadStream(file.path);

	// writefile calls putObject behind the scenes
	s3fsImpl.writeFile(file.filename, stream).then(function () {
		fs.unlink(file.path, function (err) {
			if (err) return res.send(err);

			// Update user with new image
			User.findById(req.params.user_id, function (err, user) {
				if (err) return res.send(err);

				if (req.file.filename) user.image = req.file.filename;

				user.save(function (err, user) {
					if (err) return res.send(err);

					res.json({
						message: req.file.filename + ' successfully uploaded to the server',
						filename: req.file.filename
					});
				});
			});
		});
	});
}

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
	me: me,
	list: list,
	create: create,
	view: view,
	update: update,
	upload: upload
};
