(function(){
  angular.module('auctionStatus', [])
    .directive('auctionStatus', auctionStatus);

	auctionStatus.$inject = [];

  //////

  function auctionStatus() {
    var directive = {
      restrict : 'E',
      templateUrl : '/app/views/directives/auction-status.html',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, elem, attrs) {
      scope.status = isAuctionLive(scope.auction);
      // scope.status[ isAuctionLive(scope.auction) ] = true;
    }
  }

  function isAuctionLive(auction) {
    // Check if auction hasn started yet
    var hasAuctionStarted = diffDate(auction.start_date);
    
    if(!hasAuctionStarted) {
      return { notstarted: true };
    }

    // Check if Auction has finished yet
    var hasAuctionFinished = diffDate(auction.end_date);

    if(hasAuctionFinished) {
      // Check if there's a grace period
      var latestBidDate = getLatestBidDate(auction.bids);

      if(latestBidDate) {
        // check if we've exceeded the countdown (grace period)
        var inGracePeriod = checkGracePeriod(latestBidDate, auction.countdown);

        if(inGracePeriod) {
          return { live: true };
        }

        return { expired: true };
      }
    }

    return { live: true };
  }

  function checkGracePeriod(latestBidDate, countdown) {
    var currentTime   = moment(new Date()),
      gracePeriodEnds = latestBidDate.add(countdown, 'minutes'),
      diff            = gracePeriodEnds.diff(currentTime);

    return moment.duration(diff)  >= 0;
  }

  function diffDate(thisDate) {
    var currentTime = moment(new Date()),
      diffTime      = moment(new Date(thisDate)),
      diff          = currentTime.diff(diffTime);

    return moment.duration(diff) >= 0 ;
  }

  // Returns the latest bid date to check if the auction is still 'live'
  function getLatestBidDate(bids) {
    var latestBidDate;

    // Check bids exist
    if(bids.length === 0) {
      return false;
    }

    // Sort bids by highest financial value
    bids.sort(function(b1,b2) {
      return b2.value - b1.value;
    });

    // Grab the date of highest bid
    latestBidDate = bids[0].created_at;

    // return the highest bid date
    return moment(new Date(latestBidDate));
  }
})();