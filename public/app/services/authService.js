(function(){
	angular.module('authService', ['authToken'])
		.factory('Auth', auth);
	
	auth.$inject = ['$http', '$q', '$location', 'AuthToken'];

	// ==================================
	// auth factory to login and get information
	// inject $http for communicating with the API
	// inject $q to return promise objects
	// inject AuthToken to manage token
	function auth($http, $q, $location, AuthToken) {
		return {
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn,
			getUser: getUser
		};

		// log a user in
		function login(username, password){
			// return promise object and data
			return $http.post('/api/authenticate', {
				username : username,
				password : password
			})
			.success(function(data) {
				AuthToken.setToken(data.token);
				return data;
			});
		}

		// log user out by clearing the token
		function logout(){
			AuthToken.setToken();
		}

		// check if user is logged in
		// check if there is a local token
		function isLoggedIn(event, next) {
			next = next || {};

			if (next.access !== undefined) {
				if(next.access.loginRequired) {
					if (AuthToken.getToken()) {
						return true;
					} else {
						$location.path('/login');
						return false;
					}
				}
			}
		}

		// get the logged in user
		function getUser() {
			if (AuthToken.getToken()) {
				return $http.get('/api/me', { cache: true });
			}
			return $q.reject({ message: 'User has no token.' });		
		}
	}
})();