angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope','$http','$state','auth'];

function loginCtrl($scope, $http, $state, auth) {
	  
	
	  $scope.error = false;
	 
	  $scope.data = {
			  username: "",
			  password: ""
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":undefined,
				  "boundary":"----WebKitFormBoundary7MA4YWxkTrZu0gW"
			  }
	  }
	  $scope.login = function(){
		  var fd = new FormData();
		  fd.append('username', $scope.data.username);
		  fd.append('password', $scope.data.password);
		  fd.append('client_id','54894596-7cb3-478a-8511-61e879bb97bb');
		  fd.append('client_secret','Password.1');
		  fd.append('grant_type','password');
		  fd.append('scope','app_user');
		  $http({
			  method: 'POST',fd,
			  transformRequest: angular.identity,
			  url: config.proxyURL+'/'+config.portalURL+'/oauth/token',
			  headers : {'Content-Type': undefined},
			  data: fd
			  
			}).then(function successCallback(response) {
			    console.log("response data:" +JSON.stringify(response.data));
			    auth.populateUserSession(response.data, $scope.data.username);
			    $state.transitionTo('app.main');
			  }, function errorCallback(response) {
				  $scope.error="true";
				  console.log("response data:"+ JSON.stringify(response.data));
				  console.log("response status:"+ JSON.stringify(response.status))
			  });
	  }
}