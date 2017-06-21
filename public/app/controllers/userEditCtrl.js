(function() {
	// start our angular module and inject userService
	angular.module('userEditCtrl', ['userFactory', 'ngFileUpload'])
		.controller('UserEditController', userEditController);

	userEditController.$inject = ['$routeParams', '$timeout', 'User', 'Upload', 'Notification', 'Socket'];

	// controller applied to edit user page
	function userEditController($routeParams, $timeout, User, Upload, Notification, Socket) {
		var vm = this;

		// variable to show/hide elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';

		// get user data for user to edit
		// $routeParams is how we grab data from the URL
		User.get($routeParams.user_id)
			.success(function(data) {
				vm.userData = data;

				displayS3Image(data.image);
			});


		vm.upload = function (files) {

			vm.progress = 0;
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];

					Upload.upload({
						url: '/api/users/' + vm.userData._id + '/upload/',
						data : vm.userData,
						method : 'POST',
						file: file
					}).progress(function (evt) {
						var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
						vm.progress = progressPercentage;
						vm.uploading = true;
					}).success(function (data, status, headers, config) {
						$timeout(function() {
						Notification.success(data.message);
							displayS3Image(data.filename);
							vm.uploading = false;
						});
					});
				}
			}
		};

		vm.toggleBlock = function(block) {
			vm.processing = true;

			var user = {};
			user.blocked  = block;
			user.pobox    = vm.userData.pobox;
			user.address  = vm.userData.address;
			user.city 		= vm.userData.city;
			user.mobile 	= vm.userData.mobile;

			// Call the userService function to update
			User.update($routeParams.user_id, user)
				.success(function(data) {
					vm.processing = false;

			if(user.blocked) {
			Notification.success('User has been blocked');
			
			// emit a bid reset
			// We need to refresh in case a Users bids were removed
			Socket.emit('bid:reset');
			} else {
			Notification.success('User has been Unblocked');
			}

			vm.userData.blocked = user.blocked;
			});
		};

		vm.saveUser = function() {
			vm.processing = true;

			// Remove user image
			if(vm.userData.removeImage) {
				vm.userData.image = '';
			}

			// Call the userService function to update
			User.update($routeParams.user_id, vm.userData)
				.success(function(data) {
					vm.processing = false;

					// Confirmation message
			Notification.success(data.message);
				});
		};

		// 
		function displayS3Image(img) {
			if(img) {
				vm.userImage = img;
			}
		}
	}
})();