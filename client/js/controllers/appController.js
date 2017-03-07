app.controller('appController', function ($scope, $resource, $http, $state, $rootScope, socket, Facebook) {
	$scope.initiate = function(){
		$http.get('/api/home')
		.success(function(data) {
			console.log(data);
		})
		.error(function(data) {
	    	console.log('Error: ' + data);
		});
	};

	$scope.logout = function () {
        Facebook.logout();
        $rootScope.session = {};
        //make a call to a php page that will erase the session data
        //$http.post("php/logout.php");
    };
    
	$rootScope.authenticated = true;

    $scope.users = [];
	$scope.curtrentUser = '';
	socket.on('connect', function () { });

	socket.on('updatechat', function (username, data) {
		var user = {};
		user.username = username;
		user.message = data;
		user.date = new Date().getTime();
		user.image = 'http://dummyimage.com/250x250/000/fff&amp;amp;text=' + username.charAt(0).toUpperCase();
		$scope.users.push(user);
	});

	socket.on('roomcreated', function (data) {
		socket.emit('adduser', data);
	});

	$scope.createRoom = function (data) {
		$scope.curtrentUser = data.username;
		socket.emit('createroom', data);
	}

	$scope.joinRoom = function (data) {
		$scope.curtrentUser = data.username;
		socket.emit('adduser', data);
	}

	$scope.doPost = function (message) {
		socket.emit('sendchat', message);
	}

});