'use strict';
angular.module('app', ['mainCtrl', 'authService', 'userCtrl','userService','detailsCtrl','detailService','ngRoute'])




.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html'
		})
		.when('/signup', {
			templateUrl: 'app/views/pages/signup.html'
		})
    .when('/issuebook', {
			templateUrl: 'app/views/pages/issuebook.html'
		})
      .when('/show', {
			templateUrl: 'app/views/pages/showdetails.html'
		})

		.when('/allStories', {
			templateUrl: 'app/views/pages/allStories.html',
			controller: 'AllStoriesController',
			controllerAs: 'story',
			resolve: {
				stories: function(Story) {
					return Story.allStories();
				}
			}

		})

	$locationProvider.html5Mode(true);

});