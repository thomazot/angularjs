angular
	.module('app')
	.config([
		'$routeProvider',
		function($routeProvider){
			'use strict';
			$routeProvider
				.when('/', {
					templateUrl: '/views/index.html',
					restricted: true,
					controller: 'homeCtrl'
				})
				.when('/signin', {
					templateUrl: '/views/signin.html',
					controller: 'homeCtrl'
				}).otherwise({
					templateUrl: '/views/404.html'
				});

		}
	]);