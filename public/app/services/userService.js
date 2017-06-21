(function(){
	angular.module('userService', [])
		.factory('User', userFactory);

	userFactory.$inject = ['$http'];

	/////

	function userFactory($http) {
		return {
			get: get,
			all: all,
			create: create,
			update: update,
			delete: remove
		};

		// get single user
		function get(id) {
			return $http.get('/api/users/' + id);
		}

		// get all users
		function all() {
			return $http.get('/api/users');
		}

		// create a user
		function create(userData) {
			return $http.post('/api/users', userData);
		}

		// update user
		function update(id, userData) {
			return $http.put('/api/users/' + id, userData);
		}

		// delete user
		function remove(id) {
			return $http.delete('/api/users/' + id);
		}
	}
})();