angular
.module('app')
.controller("headerCtrl", headerCtrl)

headerCtrl.$inject = ['$scope','$http','$state','auth'];

function headerCtrl($scope, $http, $state, auth) {
	
	$scope.user = {
		i_account_name : ""
	};
	
	$scope.user.i_account_name = JSON.parse(auth.getUserSession()).i_account_name;
	console.log(JSON.parse(auth.getUserSession()).i_account_name);		
	
	//LOGOUT PROCEDURE
	$scope.logout = function(){
		auth.clearUserSession();
		$state.transitionTo('appSimple.login');
	}
}

