(function(){
	angular.module('mainCtrl', ['ui.bootstrap.datetimepicker'])
		.controller('MainController', mainController);
	
	function mainController($rootScope, $route, $location, Auth) {
		var vm  = this;

		// get info for the person who is logged in
		vm.loggedIn = Auth.isLoggedIn();

		// check to see if the user is logged in on every reqyest
		$rootScope.$on('$routeChangeStart', function(event, next) {
			vm.loggedIn = Auth.isLoggedIn(event, next);

			// get user information on route change
			Auth.getUser()
				.then(function(data) {
					vm.user = data.data;
				});
		});

		$rootScope.reloadRoute = function() {
		$route.reload();
		};

		// function to handle login form
		vm.doLogin = function() {
			vm.processing = true;

			// clear error
			vm.error = '';

			// call Auth.login()
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;

					// if a user successfully logs in, redirect them to root
					if (data.success) {
						$location.path('/');
					} else {
						vm.error = data.message;
					}
				});
		};

		// handle logging out
		vm.doLogout = function() {
			Auth.logout();

			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	}
})();