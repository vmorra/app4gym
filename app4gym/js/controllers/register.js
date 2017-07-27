//register.js
angular.
module('app').
controller('RegisterCtrl', RegisterCtrl)

RegisterCtrl.$inject = ['$scope', '$http'];
function RegisterCtrl($scope, $http) {

  $scope.submit = function(event){
      event.preventDefault();
      alert("sono uno che....");
  }
}
