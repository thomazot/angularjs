/* Parse Config */
var parseApplicationId = '56cM9hwU8oYj8o3sm6sseDBMDMk1CJDTW9t9dveX';
var parseRestApiKey = 'otHAJvrTNEZ3m51oLpfj9Tzo90YUIusKGgRsgKvR';

var config = function($httpProvider, $locationProvider) {
	'use strict';
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.interceptors.push('authenticationHttpInterceptor');
};

var route = function($rootScope, $location, session) {
	'use strict';

	$rootScope.$on('$routeChangeSuccess', function(event, current) {
		if(current.restricted && !session.get('_authentication')) {
			$location.path('/signin');
		}
	});
};

var authentication = function(session) {
	'use strict';

	return {
		request: function(config) {
			config.headers['X-Parse-Application-Id'] = parseApplicationId;
			config.headers['X-Parse-REST-API-Key'] = parseRestApiKey;
			config.headers['X-Parse-Revocable-Session'] = '1';

			var user = session.get('_authentication');

			if(user) {
				config.headers['X-Parse-Session-Token'] = user.sessionToken;
			}

			return config;
		}
	};
};

angular
	.module('app', ['ngRoute','core'])
	.config(['$httpProvider', '$locationProvider', config])
	.factory('authenticationHttpInterceptor', ['session', authentication])
	.run(['$rootScope', '$location', 'session', route]);
