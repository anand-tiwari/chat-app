app.controller('AuthCtrl', function ($scope, AuthService, $state,$rootScope) {
  	'use strict';
    $rootScope.authenticated = false;
    function init(){
        $rootScope.loginFun();
    };

    $scope.login ={
      userName :'anand',
      passWord: 'welcome1'
    };

    $rootScope.loginFun = function(){
        AuthService.signIn($scope.login.userName,$scope.login.passWord);
    };
    //init();
});
  