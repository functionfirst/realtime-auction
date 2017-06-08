angular.module('auctionService', [])

.factory('Auction', function($http) {
	// create object
	var auctionFactory = {};

	// get single auction
	auctionFactory.get = function(id, filter) {
		return $http.get('/api/auctions/' + id, { params: filter });
	};

	// get all auctions
	auctionFactory.all = function() {
		return $http.get('/api/auctions');
	};

	// create an auction
	auctionFactory.create = function(auctionData) {
		return $http.post('/api/auctions', auctionData);
	};

	// update auction
	auctionFactory.update = function(id, auctionData) {
		return $http.put('/api/auctions/' + id, auctionData);
	};

	// submit a bid
	auctionFactory.bid = function(id, bidData) {
		return $http.put('/api/auctions/' + id + '/bid', bidData);
	};

	// delete auction
	auctionFactory.delete = function(id) {
		return $http.delete('/api/auctions/' + id);
	};

	return auctionFactory;
});