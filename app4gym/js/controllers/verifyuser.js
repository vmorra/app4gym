angular
.module('app')
.controller('verifyUserCtrl', verifyUserCtrl)

verifyUserCtrl.$inject = ['$scope','$http','$state','$stateParams' ,'$location'];

function verifyUserCtrl($scope, $http, $state,$stateParams,$location) {	

	$scope.responseSuccess="";
    $scope.url ="http://localhost:3001/api/auth/email-verification/"+$stateParams.token;
	$http.get($scope.url).then(function success(response){
		console.log("response verification:" +JSON.stringify(response.data))
		$scope.responseSuccess = true;
	    //$state.transitionTo('app.main');
	},function error(response){
		console.log("response verification error:" +JSON.stringify(response.data))
		$scope.responseSuccess = false;
	})
}