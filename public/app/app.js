// name angular app
angular.module('userApp', [
	'appRoutes',
	'authService',
	'ui-notification',
	'bidCtrl',
	'mainCtrl',
	'userCtrl',
	'homeCtrl',
	'auctionCtrl',
	'auctionCreateCtrl',
	'auctionEditCtrl',
	'userService',
	'auctionService',
	'socketService'
])

// application config to integrate token into requests
.config(function($httpProvider, NotificationProvider) {
	// attach auth interceptor to http requests
	$httpProvider.interceptors.push('AuthInterceptor');

	// notifications
	NotificationProvider.setOptions({
    delay: 4000,
    startTop: 70,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'top',
    replaceMessage: true
  });
});