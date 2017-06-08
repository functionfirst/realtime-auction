// start our angular module and inject auctionService
angular.module('auctionCtrl', ['auctionService'])

// auction controller for the main page
// inject the Auction factory
.controller('AuctionController', function($scope, Auction) {
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
})


// controller applied to creation page
.controller('AuctionCreateController', function(Auction, Notification) {
	var vm = this;

	// variable to show/hide elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';

	// function to create an auction
	vm.saveAuction = function() {
		vm.processing = true;

		// create auction function from auctionService
		Auction.create(vm.auctionData)
			.success(function(data) {
				vm.processing = false;

				// clear form
				vm.auctionData = {};

				Notification.success(data.message);
			});
	};
})

// controller applied to edit auction page
.controller('AuctionEditController', function($routeParams, Auction, Notification) {
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
});