var app = angular.module('app', ['ui.router','ngResource','ngAnimate', 'ngSanitize','ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'client/views/login.html',
        controller: 'AuthCtrl'
    })
      .state('home', {
        url: '/home',
        templateUrl: 'client/views/home.html',
        controller: 'appController'
    });
    $locationProvider.html5Mode(true);
}]);
