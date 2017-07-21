(function(){
	angular.module('auctionEditCtrl', ['auctionFactory'])
		.controller('AuctionEditController', auctionEditController);

	auctionEditController.$inject = ['$routeParams', 'Auction', 'Notification'];

	// controller applied to edit auction page
	function auctionEditController($routeParams, Auction, Notification) {
		var vm = this;
		vm.type = 'edit';
		vm.currentTab = 'details';
		vm.setTab = setTab;
		vm.saveAuction = saveAuction;

		init();

		/////

		function init() {
			Auction.get(
				$routeParams.auction_id, {
				blocked: true
			}).success(function(data) {
				vm.auctionData = data;
				vm.noBids = data.bids.length <= 0;
				vm.noAutobids = data.autobids.length <= 0;
			});
		}

		function setTab(tab) {
			vm.currentTab = tab;
		}

		function saveAuction() {
			vm.processing = true;

			// Call the auctionFactory function to update
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
		}
	}
})();