const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createUserToken = u => {
	const superSecret = process.env.SECRET;
	const expiresIn = process.env.TOKEN_EXPIRY * (24 * 60 * 60) // 24 = hours. 60 = minutes

	const user = {
		admin: u.admin,
		email: u.email,
		userid: u._id,
		name: u.name
	}

	return jwt.sign(user, superSecret, { expiresIn });;
}

const authenticate = async (req, res) => {
	try {
		const user = await User
			.findOne({ email: req.body.email }, 'name email password admin blocked')
			.orFail(new Error("Authentication failed. Error 1"));

		user.authenticate(req.body.password);

		const token = createUserToken(user);

		res.json({
			success: true,
			token,
			name: user.name
		});
	} catch (err) {
		res.json({
			success: false,
			error: err.message
		})
	}
}

module.exports = authenticate;
