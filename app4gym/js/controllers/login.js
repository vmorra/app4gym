angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope','$http','$state','auth'];

function loginCtrl($scope, $http, $state, auth) {
	  
	
	  $scope.error = false;
	  
	  $scope.user = {
			  username: "",
			  password: ""
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":"application/json",
			  }
	  }
	  
	  $scope.login = function(){
		  $http({
			  method: 'POST',
			  url: 'http://localhost:3001/api/auth/login',
			  data: $scope.user,
			  config : $scope.headers
			}).then(function successCallback(response) {
			    console.log("response data:" +JSON.stringify(response.data));
			    auth.populateUserSession(response.data);
			    $state.transitionTo('app.main');
			  }, function errorCallback(response) {
				  $scope.error="true";
				  console.log("response data:"+ JSON.stringify(response.data));
				  console.log("response status:"+ JSON.stringify(response.status))
			  });
	  }
}