(function(){
	angular.module('homeCtrl', ['auctionFactory'])
		.controller('HomeController', homeController);

	function homeController(Auction) {
		var vm = this;

		// set processing variable to indicate loading items
		vm.processing = true;

		// grab all auction bids
		Auction.all()
			.success(function(data) {
				vm.processing = false;

				data.forEach(function(item) {
					item.status = isAuctionLive(item);
				});

				// bind auction data
				vm.auctions = data;
			});

		function isAuctionLive(auction) {
			var currentTime = moment(new Date());
			var startTime 	= moment(new Date(auction.start_date));
			var hasStarted 	= moment.duration(currentTime.diff(startTime)) >= 0 ;
			
			// Auction hasn't started yet
			if(!hasStarted) {
				return { notstarted: true };
				// return 'notstarted';
			}

			var endTime 	= moment(new Date(auction.end_date));
			var hasFinished = moment.duration(currentTime.diff(endTime)) >= 0;

			if(hasFinished) {
				// Check if there's a grace period
				if(auction.bids.length > 0) {
					// sort bids, we're going to grab the highest
					auction.bids.sort(function(b1,b2) {
						return b2.value - b1.value;
					});

					// grab the highest bid
					// check if we've exceeded the countdown (grace period)
					var latestBid = auction.bids[0],
						latestBidTime = moment(new Date(latestBid.created_at)),
						gracePeriodEnds = latestBidTime.add(auction.countdown, 'minutes'),
						gracePeriod = moment.duration(gracePeriodEnds.diff(currentTime));
					
					if(gracePeriod >= 0) {
						return { live: true };
					}
					
					// return 'expired';
					return {
						expired: true,
						date: latestBid.created_at
					};
				}
			}

			// return false;
			// return 'live';
			return { live: true };
		}
	}
})();