(function(){
	angular.module('auctionService', [])
		.factory('Auction', auctionFactory);

	auctionFactory.$inject = ['$http'];

	/////

	function auctionFactory($http) {
		return {
			get: get,
			all: all,
			create: create,
			update: update,
			bid: bid,
			delete: remove
		};

		// get single auction
		function get(id, filter) {
			return $http.get('/api/auctions/' + id, { params: filter });
		}

		// get all auctions
		function all() {
			return $http.get('/api/auctions');
		}

		// create an auction
		function create(auctionData) {
			return $http.post('/api/auctions', auctionData);
		}

		// update auction
		function update(id, auctionData) {
			return $http.put('/api/auctions/' + id, auctionData);
		}

		// submit a bid
		function bid(id, bidData) {
			return $http.put('/api/auctions/' + id + '/bid', bidData);
		}

		// delete auction
		function remove(id) {
			return $http.delete('/api/auctions/' + id);
		}
	}
})();