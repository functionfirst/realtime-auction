(function(){
	angular.module('auctionCtrl', ['auctionFactory'])
		.controller('AuctionController', auctionController);

	auctionController.$inject = ['$scope', 'Auction'];

	/////

	function auctionController($scope, Auction) {
		// redirect if not an admin
		if(!$scope.main.user.admin) {
			window.location.href = '/restricted';
		}

		var vm = this;

		// set a processing variable to show loading things
		vm.processing = true;

		// grab all the auctions at page load
		Auction.all()
			.success(function(data) {
				// when all the auctions come back, remove the processing variable
				vm.processing = false;

				// bind the auctons that come back to vm.auctions
				vm.auctions = data;
				vm.count = data.length;
			});
	}
})();