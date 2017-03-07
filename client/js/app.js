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


app.run(function ($rootScope) {
    window.fbAsyncInit = function () {
        FB.init({
            appId   : '1730977393831208',
            status  : true, 
            cookie  : true, 
            xfbml   : true,
            version : 'v2.8'
        });
        
        FB.Event.subscribe('auth.statusChange', function(response) {
            $rootScope.$broadcast("fb_statusChange", {'status': response.status});
        });
    };

    /*(function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));*/

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/es_LA/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});