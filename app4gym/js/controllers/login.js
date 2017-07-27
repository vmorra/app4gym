angular
.module('app',['angular-uuid'])
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope','$http','$state','uuid'];

function loginCtrl($scope, $http, $state, uuid) {
	
	  $scope.user = {
			  username: "",
			  password: ""
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":"application/json",
				  "Authorization": uuid.v4()
			  }
	  }
	  
	  $scope.login = function(){
		  $http({
			  method: 'POST',
			  url: 'http://localhost:3001/api/auth/login',
			  data: $scope.user,
			  config : $scope.headers
			}).then(function successCallback(response) {
			    console.log("response data:" +JSON.stringify(response.data))
			    $state.transitionTo('app.main');
			  }, function errorCallback(response) {
				  
				  console.log("response data:"+ JSON.stringify(response.data));
				  console.log("response status:"+ JSON.stringify(response.status))
			  });
	  }
}