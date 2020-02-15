// Ensures that the user is an admin
// Used to restrict access on certain routes
const auth = (req, res, next) => {
	try {
		if (!req.decoded) {
			throw new Error('No token provided');
		}

		if (!req.decoded.admin) {
			throw new Error('Restricted Access.');
		}

		next();
	} catch ({ message }) {
		return res.status(403).json({ message });
	}
}

module.exports = auth;
