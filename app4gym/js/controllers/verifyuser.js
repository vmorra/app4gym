angular
.module('app')
.controller('verifyUserCtrl', verifyUserCtrl)

verifyUserCtrl.$inject = ['$scope','$http','$state','$stateParams' ,'$location'];

function verifyUserCtrl($scope, $http, $state,$stateParams,$location) {
     
	var arr = $location.url().split('/');
	var length = arr.length;
	$scope.token = arr[length-1];
	
    $scope.url ="http://localhost:3001/api/auth/email-verification/"+$stateParams.token;
	$http.get($scope.url).then(function success(response){
		console.log("response verification:" +JSON.stringify(response.data))
	    //$state.transitionTo('app.main');
	},function error(response){
		console.log("response verification error:" +JSON.stringify(response.data))
	})
}