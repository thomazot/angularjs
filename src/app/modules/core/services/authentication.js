
var authentication = function($http, $q, session) {
	'use strict';

	function logIn(username, password) {
		var defer = $q.defer();
		var auth = session.get('_authentication');

		$http({
			method: 'GET',
			url: 'https://api.parse.com/1/login',
			params: {
				username: username,
				password: password
			}
		}).then(function(result){
			session.add('_authentication', result.data);
			defer.resolve(result.data);
		}, function(error){
			if(auth) {
				session.remove('_authentication');
			}
			defer.reject(error);
		});

		return defer.promise;
	}

	function logOut() {
		var defer = $q.defer();
		var auth = session.get('_authentication');

		$http({
			method: 'POST',
			url: 'https://api.parse.com/1/logout'
		}).then(function(result){
			if(auth) {
				session.remove('_authentication');
			}
			defer.resolve(result);
		}, function(error){
			defer.reject(error);
		});

		return defer.promise;
	}

	return {
		logIn: logIn,
		logOut: logOut
	};
};

angular.module('core')
	.factory('authentication', ['$http', '$q', 'session', authentication]);