angular.module('appRoutes', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			// homepage
			.when('/', {
				templateUrl : 'app/views/pages/home.html',
				controller : 'HomeController',
				controllerAs : 'home',
				access: {
					loginRequired: true
				}
			})

			// restricted
			.when('/restricted', {
				templateUrl : 'app/views/pages/restricted.html',
				controller : 'HomeController',
				controllerAs : 'home',
				access: {
					loginRequired: false
				}
			})

			// login page
			.when('/login', {
				templateUrl : 'app/views/pages/login.html',
				controller : 'MainController',
				controllerAs : 'login',
				access: {
					loginRequired: false
				}
			})


			// show single auction with bids
			.when('/bids/:auction_id', {
				templateUrl : 'app/views/pages/bids/single.html',
				controller : 'BidController',
				controllerAs : 'auction',
				access: {
					loginRequired: true
				}
			})

			// show all auctions
			.when('/auctions', {
				templateUrl : 'app/views/pages/auctions/all.html',
				controller : 'AuctionController',
				controllerAs : 'auction',
				access: {
					loginRequired: true
				}
			})

			// create an auction
			.when('/auctions/create', {
				templateUrl : 'app/views/pages/auctions/single.html',
				controller : 'AuctionCreateController',
				controllerAs : 'auction',
				access: {
					loginRequired: true
				}
			})

			// edit an auction
			.when('/auctions/:auction_id', {
				templateUrl : 'app/views/pages/auctions/single.html',
				controller : 'AuctionEditController',
				controllerAs : 'auction',
				access: {
					loginRequired: true
				}
			})

			// show all users
			.when('/users', {
				templateUrl : 'app/views/pages/users/all.html',
				controller : 'UserController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			})

			// form to create a new user
			// same view as edit paage
			.when('/register', {
				templateUrl : '/app/views/pages/users/register.html',
				controller : 'UserCreateController',
				controllerAs : 'user',
				access: {
					loginRequired: false
				}
			})

			// Confirmation page after registering
			.when('/registered', {
				templateUrl : '/app/views/pages/users/registered.html',
				controller : 'UserConfirmController',
				controllerAs : 'user',
				access: {
					loginRequired: false
				}
			})

			// page to edit user
			.when('/users/:user_id', {
				templateUrl : 'app/views/pages/users/edit.html',
				controller : 'UserEditController',
				controllerAs : 'user',
				access: {
					loginRequired: true
				}
			});

			// get rid of the hash in url
			$locationProvider.html5Mode(true);
	});