(function(){
  angular.module('auctionStatus', [])
    .directive('auctionStatus', auctionStatus);

	auctionStatus.$inject = [];

  //////

  function auctionStatus() {
    var directive = {
      restrict : 'E',
      scope: {
        ngModel: '='
      },
      templateUrl : '/app/views/directives/auction-status.html',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, elem, attrs) {
      scope.status = isAuctionLive(scope);
    }
  }

  function isAuctionLive(scope) {
    var auction = scope.ngModel;

    var currentTime = moment(new Date());
      startTime 	= moment(new Date(auction.start_date));
      hasStarted 	= moment.duration(currentTime.diff(startTime)) >= 0 ;
    
    // Auction hasn't started yet
    if(!hasStarted) {
      // return 'notstarted';
      return {
        notstarted: true,
        start_date: auction.start_date
      };
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
          return {
            live: true,
            start_date: auction.start_date
          };
        }
        
        // return 'expired';
        return {
          expired: true,
          date: latestBid.created_at
        };
      }
    }

    // return 'live';
    return {
      live: true,
      start_date: auction.start_date
    };
  }
})();