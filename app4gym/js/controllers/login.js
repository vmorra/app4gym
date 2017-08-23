angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope','$http','$state','auth'];

function loginCtrl($scope, $http, $state, auth) {
	  
	
	  $scope.error = false;
	  
	  $scope.user = {
			  name: "",
			  pass: ""
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":"application/json",
			  }
	  }
	  
	  $scope.login = function(){
		  $http({
			  method: 'POST',
			  url: 'https://cors-anywhere.herokuapp.com/http://dev-app4gym.pantheonsite.io/user/login?_format=json',
			  data: $scope.user,
			  config : $scope.config.headers
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