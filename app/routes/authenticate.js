var User = require('../models/user'),
	jwt = require('jsonwebtoken'),
	superSecret = process.env.SECRET;

function authenticate(req, res) {
	// select the name email and password explicitly
	User.findOne({
		email: req.body.email
	}).select('name email password admin blocked').exec(function (err, user) {
		if (err) throw err;

		// no user with that email was found
		if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. Error 1.'
			});
		} else if (user) {
			var accountBlocked = user.blocked;
			var validPassword = user.comparePassword(req.body.password);

			// Check if account is blocked
			if (accountBlocked) {
				res.json({
					success: false,
					message: 'Authentication failed. Error 2.'
				});

				// check password matches
			} else if (!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Error 3.'
				});
			} else {
				// if user is found and password is correct
				// create a token
				var token = jwt.sign({
					admin: user.admin,
					email: user.email,
					userid: user._id,
					name: user.name
				}, superSecret, {
					expiresIn: process.env.TOKEN_EXPIRY * (24 * 60 * 60) // 24 = hours. 60 = minutes
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token',
					user: {
						email: user.email,
						userid: user._id,
						name: user.name,
						token
					}
				});
			}
		}
	});
};

module.exports = authenticate;
