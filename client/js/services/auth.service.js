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