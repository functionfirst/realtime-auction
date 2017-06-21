(function() {
	// start our angular module and inject userService
	angular.module('userCtrl', ['userFactory'])
		.controller('UserController', userController);

	userController.$inject = ['User'];

	// user controller for the main page
	// inject the User factory
	function userController(User) {
		var vm = this;

		// set a processing variable to show loading things
		vm.processing = true;

		// grab all the users at page load
		User.all()
			.success(function(data) {
				// when all the users come back, remove the processing variable
				vm.processing = false;

				// bind the users that come back to vm.users
				vm.users = data;
				vm.count = data.length;
			});


		// delete a user
		vm.deleteUser = function(id) {
			vm.processing = true;

			// accept the user id as a param
			User.delete(id)
				.success(function(data) {
					// get all users to update the table
					// also setup api to return the list of users with the delete call
					User.all()
						.success(function(data) {
							vm.processing = false;
							vm.users = data;
						});
				});
		};

	}
})();