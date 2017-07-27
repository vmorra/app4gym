//register.js
angular.
module('app').
controller('RegisterCtrl', RegisterCtrl)

RegisterCtrl.$inject = ['$scope', '$http'];
function RegisterCtrl($scope, $http) {

	 $scope.user = {
			 
			  "i_account_name": "",
			  "i_password": "",
			  "a_email": [
			    ""
			  ],
			  "type": "Tecnico",
			  "status":"Pending",
			  "roles": [
			    {
			      "code": 1,
			      "label": "User",
			      "description": "string"
			    }
			    ]
			  
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":"application/json"
			  }
	  }
	  
	  $scope.submit = function(){
		  $http({
			  method: 'POST',
			  url: 'http://localhost:3001/api/auth/signup',
			  data: $scope.user,
			  config : $scope.headers
			}).then(function successCallback(response) {
			    console.log("response data:" +JSON.stringify(response.data))
			    $state.transitionTo('appSimple.login');
			  }, function errorCallback(response) {
				  
				  console.log("response data:"+ JSON.stringify(response.data));
				  console.log("response status:"+ JSON.stringify(response.status))
			  });
	  }
}
