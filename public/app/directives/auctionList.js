(function(){
  angular.module('auctionList', [])
    .directive('auctionList', auctionList);

	auctionList.$inject = ['Auction'];

  //////

  function auctionList(Auction) {
    var directive = {
      restrict : 'E',
      scope: {
        ngModel: '='
      },
      templateUrl : '/app/views/directives/auction-list.html',
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, elem, attrs) {
      scope.processing = true;

      Auction.all()
        .success(function(data) {
          scope.no_data = !data;
          scope.auctions = data;

          scope.processing = false;
      });
    }
  }
})();