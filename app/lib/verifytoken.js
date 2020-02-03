const jwt = require('jsonwebtoken');
const superSecret = process.env.SECRET;

function verifyToken(req, res, next) {
	// check header or url params or post params for token
	var token = req.body.token || req.params['token'] || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verify secret and check expiry
		jwt.verify(token, superSecret, function(err, decoded) {
			if (err) {
				return res.status(403).send({
					success : false,
					message : 'Failed to authenticate token'
				});
			} else {
				// if everything is good, save to request for use in other routes
				req.admin = decoded.admin; // track if they are admin as part of the request
				req.decoded = decoded;

				next();
			}
		});
	} else {
		// no token
		// return a 403 http response (access forbidden) and an error
		return res.status(403).send({
			success : false,
			message : 'No token provided'
		});
	}
}

module.exports = verifyToken;