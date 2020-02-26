const apiHome = (req, res) => {
	res.json({
		message: "Welcome to the Real-time Auctions API!"
	});
}

module.exports = {
	apiHome
}
