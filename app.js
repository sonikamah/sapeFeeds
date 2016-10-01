'use strict';

angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider)
{
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login.html'
		});

});
