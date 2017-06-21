(function() {
	angular.module('bidCtrl', ['auctionService', 'socketService'])
		.controller('BidController', bidController);

	function bidController($interval, $routeParams, $window, $filter, $sce, Auction, Socket, Auth, Notification) {
		var vm = this,
			auctionCountdown,		// interval timer to countdown before auction ends
			startTimeCountdown, 	// interval timer countdown before auction starts
			maxTimeout = 60,		// timeout in seconds
			timeout = 0;

		// get user information
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});

		// set a processing variable to show loader
		vm.processing = true;
		vm.current_bid = vm.current_bid || {};

		// get auction data for auction to edit
		// $routeParams is how we grab data from the URL
		Auction.get($routeParams.auction_id)
			.success(function(data) {
				vm.auctionData = data;
				vm.processing = false;

				if(data.bids.length){
					vm.current_bid = data.bids[data.bids.length-1];
				} else {
					vm.starting_bid = data.start_amount;
					vm.current_bid.value = data.start_amount;
				}

				auctionStart.startCountdown();
				renderBid();
			});

		// BIDDING
		vm.checkBid  = function() {
			vm.confirmBid = true;
		};

		vm.cancelBid = function() {
			vm.confirmBid = false;
		};

		vm.saveBid = function() {
			sendBid({
				value : vm.mybid,
				userid : vm.user.userid,
				username: vm.user.username
			});
		};


		// AUTOBIDDING
		vm.checkAutobid = function() {
			if(vm.autobid > 0) {
				vm.confirmAutobid = true;
			} else {
				vm.autobid.focus();
			}
		};

		vm.cancelAutobid = function() {
			vm.confirmAutobid = false;
		};

		vm.saveAutobid = function() {
			sendBid({
				value: vm.autobid,
				userid: vm.user.userid,
				username: vm.user.username,
				autobid: true
			});
		};

		vm.selectBidIncrement = function() {
			renderBid();
		};

		Socket.on('bid:reset', function() {
			// a User was blocked so reload each bid
			$window.location.reload();
		});

		Socket.on('bid:send', function (auction) {
			// check if this bid was updated - if it was then reload it
			var currentAuction = auction.auction_id === $routeParams.auction_id;

			if(currentAuction) {
				timeout = 0;
				// If we receive a new bid
				// reset view to stop someone completing a bid
				vm.confirmBid = false;
				vm.current_bid = auction.bid;

				renderBid(true);
			}
		});

		function sendBid(bid) {
			vm.processing = true;

			Auction.bid($routeParams.auction_id, bid)
				.success(function(data) {
					// reset
					vm.confirmBid = false;
					vm.confirmAutobid = false;
					vm.autobid = '';
					vm.processing = false;

					// check for a message
					if(data.message) {
						if(data.result) {
							// success - show notification
							Notification.success(data.message);
						} else {
							// error - show notification then exit
							Notification.error(data.message);
						}
					}

					// check for error
					if(!data.success) {
						return false;
					}

					vm.current_bid = data.auction.bid;

					// Check if this was a new autobid
					if(bid.autobid) {
						// temporarily dump the autobid into the autobids array for this auction
						vm.auctionData.autobids.push(bid);
					}

					// emit bid details
					Socket.emit('bid:send', data.auction);

					renderBid(true);
				});
		}

		function getAutobidForUser() {
			var autobid = vm.auctionData.autobids.filter(function(obj){
					return obj.userid == vm.user.userid;
				}).sort(function(b1,b2){
					return b2.value - b1.value;
				});

			if(autobid.length > 0) {
				return autobid[0].value;
			}

			return;
		}

		function renderBid(showNotification) {
			vm.mybid = parseInt(vm.current_bid.value) + (parseInt(vm.bidIncrement));
			vm.hasBids = vm.current_bid.userid !== undefined;

			vm.user.autobid = getAutobidForUser();

			// Check the auction has bids
			if(vm.hasBids) {
				vm.highestBidValue = vm.current_bid.value;

				// Block user from bidding against themselves
				vm.currentBidder = vm.current_bid.userid === vm.user.userid;

				if(vm.mybid) {
					if(vm.currentBidder) {
						vm.buttonclass = 'btn-danger disabled';
						vm.buttontext = $sce.trustAsHtml('You are currently the highest bidder');
						
						if(showNotification) {
							Notification.success('You are currently the highest bidder');
						}
					} else {
						vm.buttonclass = 'btn-primary';
						vm.buttontext =  $sce.trustAsHtml('Place Bid<br />(' + $filter('currency')(vm.mybid, '£ ') + ')<span>You can review before submitting</span>');

						if(showNotification) {
							Notification.error('You are not the highest bidder');
						}
					}
				} else {
					vm.buttonclass = "hide";
				}

				/* TIMER *****************
					Resets countdown to auction expiry
				*/
				stopCountdown();
				updateCountdown();
				auctionCountdown = $interval(updateCountdown, 1000);
			} else {
				if(vm.mybid) {
					vm.buttonclass = 'btn-primary';
					vm.buttontext =  $sce.trustAsHtml('Place Bid<br />(' + $filter('currency')(vm.mybid, '£ ') + ')<span>You can review before submitting</span>');
				} else {
					vm.buttonclass = "hide";
				}
			}
		}

		function checkForGracePeriod(currentTime) {
			// Get the time from the latest bid
			var latestBidTime 	= moment(new Date(vm.current_bid.created_at));
			
			// Add our grace period onto the last bid time
			var gracePeriodEnds = latestBidTime.add(vm.auctionData.countdown, 'minutes');

			// Establish the difference between the new gracePeriod and the current time
			var gracePeriod 	= moment.duration(gracePeriodEnds.diff(currentTime));
			
			// Check if we're past the grace period
			if(gracePeriod <= 0 ) {
				// the grace period for the auction has expired
				// mark the auction as expired
				vm.expired = true;

				// stop the internal countdown
				$interval.cancel(auctionCountdown);
			} else {
				// the auction is still within the grace period
				// display the countdown
				setCountdownTimer(gracePeriod);
			}
		}

		function setCountdownTimer(date) {
			vm.timer = {
				days : date._data.days,
				hours : date._data.hours,
				minutes : date._data.minutes,
				seconds : date._data.seconds
			};
		}

		function updateCountdown(){
			// Establish when an active auction will expire
			var currentTime = moment(new Date());
			var endTime = moment(new Date(vm.auctionData.end_date));
			var diff = moment.duration(endTime.diff(currentTime));
			
			setCountdownTimer(diff);
			
			// Check timeout counter
			// if more than 300 seconds (5 minutes) then reload the page
			// hacky way to ensure the user is synced
			if(timeout++ >= maxTimeout) {
				$window.location.reload();
			}

			// Check if we reached the auction end date
			if(diff <= 0) { 
				// check for a grace period
				checkForGracePeriod(currentTime);
			}
		}

		function stopCountdown() {
			$interval.cancel(auctionCountdown);
		}

		/* start time countdown */
		var auctionStart = {
			startCountdown : function() {
				auctionStart.stopCounter();
				auctionStart.updateCounter();
				auctionStart.startCountdown = $interval(auctionStart.startCountdown, 1000);
			},
			stopCounter : function() {
				$interval.cancel(startTimeCountdown);
			},
			updateCounter : function(){
				// Calculated time before auction starts
				var currentTime = moment(new Date());
				var startTime = moment(new Date(vm.auctionData.start_date));
				var diff = moment.duration(startTime.diff(currentTime));

				if(diff <= 0) {
					// activate the auction.
					vm.active = true;
					$interval.cancel(startTimeCountdown);
				} else {
			
					vm.start = {
						days : diff._data.days,
						hours : diff._data.hours,
						minutes : diff._data.minutes,
						seconds : diff._data.seconds
					};
				}
			}
		};
	}
})();