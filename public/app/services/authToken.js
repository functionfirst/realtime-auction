(function(){
    angular.module('authToken', [])
        .factory('AuthToken', authToken);

    authToken.$inject = ['$window'];

    // =======================================
    // inject $window to store token client-side
    // =======================================
    function authToken ($window) {
        return {
            getToken: getToken,
            setToken: setToken
        };

        // get token out of local storage
        function getToken() {
            return $window.localStorage.getItem('token');
        }

        // set or clear token
        // if a token is passed, set the token
        // if there is no token, clear it from local storage
        function setToken(token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        }
    }
})();