angular.module('authService', [])

// ==================================
// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage token
.factory('Auth', function($http, $q, $location, AuthToken){
	var authFactory = {};

	// log a user in
	authFactory.login = function(username, password){
		// return promose object and data
		return $http.post('/api/authenticate', {
			username : username,
			password : password
		})
		.success(function(data) {
			AuthToken.setToken(data.token);
			return data;
		});
	};

	// log user out by clearing the token
	authFactory.logout = function(){
		// clear token
		AuthToken.setToken();
	};

	// check if user is logged in
	// check if there is a local token
	authFactory.isLoggedIn = function(event, next) {
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
	};

	// get the logged in user
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/me', { cache: true });
		else
			return $q.reject({ message: 'User has no token.' });		
	};

	return authFactory;
})


// =======================================
// inject $window to store token client-side
// =======================================
.factory('AuthToken', function($window) {
	var authTokenFactory = {};

	// get token out of local storage
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	// set or clear token
	// if a token is passed, set the token
	// if there is no token, clear it from local storage
	authTokenFactory.setToken = function(token) {
		if (token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};

	return authTokenFactory;
})

// ===========================================
// application configuration to integrate token into requests
// ===========================================
.factory('AuthInterceptor', function($q, AuthToken) {
	var interceptorFactory = {};

	// attach token to every request
	interceptorFactory.request = function(config) {
		// grab the token
		var token = AuthToken.getToken();

		// if token exists, add it to header as x-access-token
		if (token)
			config.headers['x-access-token'] = token;

		return config;
	};

	// happens on response errors
	interceptorFactory.responseError = function(response) {
		// if our server returns 403 forbidden
		if (response.status == 403) {
			if(response.data.message === "Restricted access") {
				window.location.href = '/restricted';
			}

			AuthToken.setToken();
			window.location.href = '/login';
		}
		return $q.reject(response);
	};

	return interceptorFactory;
});