(function() {
	angular.module('mainCtrl', ['ui.bootstrap.datetimepicker'])
		.controller('MainController', mainController);
	
	mainController.$inject = ['$rootScope', '$route', '$location', 'Auth'];

 	/////

	function mainController($rootScope, $route, $location, Auth) {
		var vm  = this;

		// get info for the person who is logged in
		vm.loggedIn = Auth.isLoggedIn();
		vm.doLogin = doLogin;
		vm.doLogout = doLogout;
		$rootScope.reloadRoute = reloadRoute;
		$rootScope.$on('$routeChangeStart', routeChangeStart);

		// check to see if the user is logged in on every reqyest
		function routeChangeStart(event, next) {
			vm.loggedIn = Auth.isLoggedIn(event, next);

			// get user information on route change
			Auth.getUser()
				.then(function(data) {
					vm.user = data.data;
				});
		}

		function reloadRoute() {
			$route.reload();
		}

		// function to handle login form
		function doLogin() {
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
		function doLogout() {
			Auth.logout();

			// reset all user info
			vm.user = {};
			$location.path('/login');
		};
	}
})();