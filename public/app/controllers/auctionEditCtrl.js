(function(){
	angular.module('auctionEditCtrl', ['auctionService'])
		.controller('AuctionEditController', auctionEditController);

	// controller applied to edit auction page
	function auctionEditController($routeParams, Auction, Notification) {
		var vm = this;

		// variable to show/hide elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';

		// get auction data for auction to edit
		// $routeParams is how we grab data from the URL
		Auction.get($routeParams.auction_id, { blocked: true })
			.success(function(data) {
				vm.auctionData = data;
			});

		vm.saveAuction = function() {
			vm.processing = true;

			// Call the auctionService function to update
			Auction.update($routeParams.auction_id, vm.auctionData)
				.success(function(data) {
					vm.processing = false;

					Notification.success(data.message);

					if(vm.auctionData.resetbids) {
						vm.auctionData.bids = [];					
					}

					// vm.auctionData.bids = [];
					vm.auctionData.resetbids = false;
				});
		};
	}
})();