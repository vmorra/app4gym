//register.js
angular.
module('app').
controller('RegisterCtrl', RegisterCtrl)

RegisterCtrl.$inject = ['$scope', '$http', '$state'];
function RegisterCtrl($scope, $http, $state) {

	 $scope.user = {			 
		  "name": {"value" : ""},
		  "mail": {"value": ""},
		  "pass": {"value": ""} 			  
	  };
	  
	  $scope.config = {
			  headers: {
				  "Content-Type":"application/json"
			  }
	  }
	  
	  $scope.submit = function(){
		  $http({
			  method: 'POST',
			  url: 'https://cors-anywhere.herokuapp.com/http://dev-app4gym.pantheonsite.io/user/register?_format=json',
			  data: $scope.user,
			  config : $scope.headers
			}).then(function successCallback(response) {
			    console.log("response data:" +JSON.stringify(response.data))
			    $state.transitionTo('appSimple.thankyou');
			  }, function errorCallback(response) {
				  $state.transitionTo('appSimple.thankyou');
				  console.log("response data:"+ JSON.stringify(response.data));
				  console.log("response status:"+ JSON.stringify(response.status))
			  });
	  }
}
