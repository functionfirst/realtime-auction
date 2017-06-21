(function(){
	angular.module('auctionCreateCtrl', ['auctionFactory'])
		.controller('AuctionCreateController', auctionCreateController);

	function auctionCreateController(Auction, Notification) {
		var vm = this;

		vm.type = 'create';
		vm.saveAuction = saveAuction;


		// function to create an auction
		function saveAuction() {
			vm.processing = true;

			// create auction function from auctionFactory
			Auction.create(vm.auctionData)
				.success(function(data) {
					vm.processing = false;

					// clear form
					vm.auctionData = {};

					Notification.success(data.message);
				});
		}
	}
})();