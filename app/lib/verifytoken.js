const jwt = require('jsonwebtoken');
const superSecret = process.env.SECRET;

const verifyToken = (req, res, next) => {
	try {
		let token = (req.body && req.body.token) || req.params['token'] || req.headers['x-access-token'];

		if (!token) {
			throw new Error('No token provided');
		}

		try {
			req.decoded = jwt.verify(token, superSecret);
			next();
		} catch (err) {
			throw new Error('Failed to authenticate token');
		}
	} catch ({ message }) {
		return res.status(403).json({ message });
	}
}

module.exports = verifyToken;
