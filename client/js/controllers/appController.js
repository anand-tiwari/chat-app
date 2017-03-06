app.controller('appController', function ($scope, $resource, $http, $state, $rootScope) {
	$scope.initiate = function(){
		$http.get('/api/home')
		.success(function(data) {
			console.log(data);
		})
		.error(function(data) {
	    	console.log('Error: ' + data);
		});
	};
	$rootScope.authenticated = true;	
    $rootScope.logout = function(){
      $rootScope.authenticated = false;
      $state.go('login');
    };
});