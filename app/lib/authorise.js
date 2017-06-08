// Ensures that the user is an admin
// Used to restrict access on certain routes
var auth = function(req, res, next) {
	// If not admin, restrict access
	if(!req.admin) {
		return res.status(403).json({
			success : false,
			message : "Restricted access"
		});
	}
	next();
}

module.exports = auth;