// start our angular module and inject userService
angular.module('userCtrl', ['userService', 'ngFileUpload'])

// user controller for the main page
// inject the User factory
.controller('UserController', function(User) {
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

})


// controller applied to creation page
.controller('UserCreateController', function($location, User, Notification) {
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
})

// controller applied to confirmation page
.controller('UserConfirmController', function(){
	
})

// controller applied to edit user page
.controller('UserEditController', function($routeParams, $timeout, User, Upload, Notification, Socket) {
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
});