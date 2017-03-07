app.controller('AuthCtrl', function ($scope, AuthService, $state,$rootScope,$http, Facebook, $location) {
  	'use strict';
    $rootScope.authenticated = false;
    
    function init(){
       // $rootScope.loginFun();
    };

    $scope.login ={
      userName :'anand',
      passWord: 'welcome1'
    };

    $rootScope.loginFun = function(){
        AuthService.signIn($scope.login.userName,$scope.login.passWord);
    };
    //init();
/*
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          $state.go('home');
          testAPI();
        } else if (response.status === 'not_authorized') {
          document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
        } else {
          document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
        }
    };
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });
    }

    $rootScope.login = function(){
        FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
        });
    };

    $rootScope.logout = function(){
      FB.logout(function(response) {
      });
    };
   
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1730977393831208',
          cookie     : true,  // enable cookies to allow the server to access 
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.8' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
*/

    $scope.info = {};

    $rootScope.$on("fb_statusChange", function (event, args) {
        $rootScope.fb_status = args.status;
        $rootScope.$apply();
    });
    $rootScope.$on("fb_get_login_status", function () {
        Facebook.getLoginStatus();
    });
    $rootScope.$on("fb_login_failed", function () {
        console.log("fb_login_failed");
    });
    $rootScope.$on("fb_logout_succeded", function () {
        console.log("fb_logout_succeded");
        $rootScope.id = "";
    });
    $rootScope.$on("fb_logout_failed", function () {
        console.log("fb_logout_failed!");
    });

    $rootScope.$on("fb_connected", function (event, args) {

      // this function is only for testing purpose..
      /*FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        $state.go('home');
      });
*/
        /*
         If facebook is connected we can follow two paths:
         The users has either authorized our app or not.
         ---------------------------------------------------------------------------------
         http://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
         the user is logged into Facebook and has authenticated your application (connected)
         the user is logged into Facebook but has not authenticated your application (not_authorized)
         the user is not logged into Facebook at this time and so we don't know if they've authenticated
         your application or not (unknown)
         ---------------------------------------------------------------------------------
         If the user is connected to facebook, his facebook_id will be enough to authenticate him in our app,
         the only thing we will have to do is to post his facebook_id to 'php/auth.php' and get his info
         from the database.
         If the user has a status of unknown or not_authorized we will have to do a facebook api call to force him to
         connect and to get some extra data we might need to unthenticated him.
         */

        var params = {};

        function authenticateViaFacebook(parameters) {
            //posts some user data to a page that will check them against some db
            /*$http.post('php/auth.php', parameters).success(function () {
                $scope.updateSession();
            });*/
        }

        if (args.userNotAuthorized === true) {
            //if the user has not authorized the app, we must write his credentials in our database
            console.log("user is connected to facebook but has not authorized our app");
            FB.api(
                {
                    method:'fql.multiquery',
                    queries:{
                        'q1':'SELECT uid, first_name, last_name FROM user WHERE uid = ' + args.facebook_id,
                        'q2':'SELECT url FROM profile_pic WHERE width=800 AND height=800 AND id = ' + args.facebook_id
                    }
                },
                function (data) {
                    //let's built the data to send to php in order to create our new user
                    params = {
                        /*facebook_id:data[0]['fql_result_set'][0].uid,
                        first_name:data[0]['fql_result_set'][0].first_name,
                        last_name:data[0]['fql_result_set'][0].last_name,
                        picture:data[1]['fql_result_set'][0].url
*/                    }
                    authenticateViaFacebook(params);
                });
        }
        else {
            console.log("user is connected to facebook and has authorized our app");
            //the parameter needed in that case is just the users facebook id
            params = {'facebook_id':args.facebook_id};
            //authenticateViaFacebook(params);
            $rootScope.authenticated = true;
            $state.go('home');
        }
    });


    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
  /*      $http.post('php/session.php').success(function (data) {
            //and transfers them to angular
            $rootScope.session = data;
        });*/
    };

    $rootScope.updateSession();

    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();
    };
    $scope.login = function () {
        Facebook.login();
    };
    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }
    $scope.getInfo = function () {
        FB.api('/' + $rootScope.session.facebook_id, function (response) {
            console.log('Good to see you, ' + response.name + '.');
        });
        $rootScope.info = $rootScope.session;

    };
});
  