(function() {
    angular.module('authInterceptor', ['authToken'])
        .factory('AuthInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', 'AuthToken'];
        
    // ===========================================
    // application configuration to integrate token into requests
    // ===========================================
    function authInterceptor($q, AuthToken) {
        return {
            request: request,
            responseError: responseError
        };

        // attach token to every request
        function request(config) {
            // grab the token
            var token = AuthToken.getToken();

            // if token exists, add it to header as x-access-token
            if (token) {
                config.headers['x-access-token'] = token;
            }

            return config;
        }

        // happens on response errors
        function responseError(response) {
            // if our server returns 403 forbidden
            if (response.status == 403) {
                if(response.data.message === "Restricted access") {
                    window.location.href = '/restricted';
                }

                AuthToken.setToken();
                window.location.href = '/login';
            }
            return $q.reject(response);
        }
    }
})();