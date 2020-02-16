const index = (req, res) => {
	res.json({
		message: "Welcome to the Real-time Auctions API!"
	});
}

module.exports = {
	index
}
