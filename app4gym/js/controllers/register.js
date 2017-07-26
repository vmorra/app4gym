//register.js
angular
.module('app')
.controller('Register', Register)

Register.$inject = ['$scope','$http','$window'];
function Register($scope,$http, $window) {
  $scope.register = function (token) {
    // your login logic
    alert(token);
    console.log(token);
  }
  $window.login = $scope.login;
}
