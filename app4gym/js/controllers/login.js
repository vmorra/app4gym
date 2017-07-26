angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope','$http','$window'];
function loginCtrl($scope, $http, $window) {
  $scope.user = {};
  $scope.login = function(){
//	  $http.get('https://cors-anywhere.herokuapp.com/http://app4gym2uzqn2rtlz8.devcloud.acquia-sites.com/api/branch/'+$scope.actualBranch+'/apparatus/'+$scope.actualApparatus+'/group')
//		.then(function successCallBack(response) {			
//			$scope.groups = response.data;
//			console.log(JSON.stringify($scope.groups));
//		}, function errorCallBack(response) {
//			console.log("Failed to retrieve groups");
//		});
	  console.log("Ciao");
  }
}