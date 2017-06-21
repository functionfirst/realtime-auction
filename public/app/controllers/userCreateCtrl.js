(function() {
	// start our angular module and inject userService
	angular.module('userCreateCtrl', ['userFactory'])
		.controller('UserCreateController', userCreateController);

	userCreateController.$inject = ['$location', 'User', 'Notification'];

	// controller applied to creation page
	function userCreateController($location, User, Notification) {
		var vm = this;

		// function to create user
		vm.saveUser = function() {
			vm.processing = true;

			// user create function from userService
			User.create(vm.userData)
				.success(function(data) {
					vm.processing = false;

					// Confirmation
			Notification.success(data.message);

					// check for success before clearing form
					if(data.success) {
						// Clear form data
						vm.userData = {};

						// Redirect to confirmation page.
						$location.path('/registered');
					}
				});
		};
	}
})();