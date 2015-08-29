var home = function($scope, $location, authentication) {
	'use strict';

	$scope.login = function() {
		authentication
			.logIn($scope.signin.username, $scope.signin.password)
			.then(function(result){
				$location.path('/');
			}, function(error){
				return error;
			});
	};

	$scope.logout = function() {
		authentication.logOut()
			.then(function(result){
				console.log('sair');
				$location.path('/signin');
			}, function(error){

				return error;
			});
	};
};

angular.module('app')
	.controller('homeCtrl', ['$scope', '$location', 'authentication', home]);