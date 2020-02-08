var filter = {};

filter.bids = function (auction, field) {
	if (auction) {
		auction.bids = auction.bids.filter(function (obj) {
			return obj[field] != true
		});

		auction.autobids = auction.autobids.filter(function (obj) {
			return obj[field] != true
		});
	}

	return auction;
}

module.exports = filter;
