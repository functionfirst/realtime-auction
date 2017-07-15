var home = {};

home.index = function(req, res) {
		res.json({ message : "Yo, welcome to the auction API!" });
};

module.exports = home;