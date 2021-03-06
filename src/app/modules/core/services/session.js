var session = function($cookies) {
	'use strict';

	return {
		get: function(key) {
			return $cookies.getObject(key);
		},
		add: function(key, val) {
			var success = true;

			if(key && val) {
				$cookies.putObject(key, val);
			} else {
				success = false;
			}

			return success;

		},
		remove: function(key) {
			return $cookies.remove(key);
		}
	};
};

angular.module('core')
	.factory('session', ['$cookies', session]);