angular
.module('app')
.controller("headerCtrl", headerCtrl)

headerCtrl.$inject = ['$scope','$http','$state','auth'];

function headerCtrl($scope, $http, $state, auth) {
	
	$scope.user = {
		name : ""
	};
	
	$scope.config = {
			  headers: {
				  "Content-Type":"application/json",
				  "Access-Control-Allow-Origin":"*"
			  }
	  }
	
	$scope.user.name = JSON.parse(auth.getUserSession()).name;	
	
	//LOGOUT PROCEDURE
	$scope.logout = function(){	
//		 $http({
//			  method: 'POST',
//			  url: 'https://cors-anywhere.herokuapp.com/http://dev-app4gym.pantheonsite.io/user/logout?_format=json&token='+auth.getLogoutToken(),
//			  data: "",
//			  config : $scope.config.headers
//			}).then(function successCallback(response) {		
//			    auth.clearUserSession();
//			    $state.transitionTo('app.main');
//			  }, function errorCallback(response) {
//				console.log("error: "+response.data);
//			  });
		auth.clearUserSession();
		$state.transitionTo('appSimple.login');
	}
}

