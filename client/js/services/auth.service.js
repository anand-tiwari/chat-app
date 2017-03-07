app.factory('AuthService', function ($http,$state,$rootScope) {
    function signIn(uname,pass) {
        $.ajax({
            crossDomain: true,
            type: 'POST',
            cache: false,
            url: "api/login",
            data: {
                username: uname,
                password: pass,
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if(response.status){
                    $rootScope.authenticated = true;
                    $state.go('home');
                }
            },
            error: function (errorType, textStatus, errorThrown) {
            }
        });
       // $state.go('home');
    };

    return {
        signIn: signIn
    };
});

app.factory('Facebook', function ($rootScope, $state, $http) {
    return {
        getLoginStatus:function () {
            FB.getLoginStatus(function (response) {
                $rootScope.$broadcast("fb_statusChange", {'status':response.status});
            }, true);
        },
        login:function () {
            FB.getLoginStatus(function (response) {
                switch (response.status) {
                    case 'connected':
                        $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                        break;
                    case 'not_authorized':
                    case 'unknown':
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {
                                    facebook_id:response.authResponse.userID,
                                    userNotAuthorized:true
                                });
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        }, {scope:'public_profile,email'});
                        break;
                    default:
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                                $rootScope.$broadcast('fb_get_login_status');
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                }
            }, true);
        },
        logout:function () {
            FB.logout(function (response) {
                if (response) {
                    $rootScope.$broadcast('fb_logout_succeded');
                    $state.go('login');
                } else {
                    $rootScope.$broadcast('fb_logout_failed');
                }
            });
        },
        unsubscribe:function () {
            FB.api("/me/permissions", "DELETE", function (response) {
                $rootScope.$broadcast('fb_get_login_status');
            });
        }
    };
});
