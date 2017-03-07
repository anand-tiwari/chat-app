var app = angular.module('app', ['ui.router','ngResource','ngAnimate', 'ngSanitize','ui.bootstrap']);

app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'client/views/login.html',
        controller: 'AuthCtrl',
        data: {requiredLogin: false}
    })
      .state('home', {
        url: '/home',
        templateUrl: 'client/views/home.html',
        controller: 'appController',
        data: {requiredLogin: true}
    });
    $locationProvider.html5Mode(true);
}]);


app.run(function ($rootScope, $state) {

/*On route change checking wheather user can access this route directly without login or not ??? ...*/
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var requiredLogin = false;
        // check if this state need login
        if (toState.data && toState.data.requiredLogin)
            requiredLogin = true;
        // if yes and if this user is not logged in, redirect him to login page
        if (requiredLogin && !$rootScope.authenticated) {
            event.preventDefault();
            $state.go('login');
        }
    });
/*end of checking ..*/

    // facebook login authentication ..
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