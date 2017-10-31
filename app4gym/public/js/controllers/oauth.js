//oauth.js
angular
.module('app')
.controller('oauthParamCtrl', oauthParamCtrl)

oauthParamCtrl.$inject = ['$scope'];
function oauthParamCtrl($scope) {
	var queryString = location.hash.substring(1);
	
	// Parse query string to see if page request is coming from OAuth 2.0 server.

	  var regex = /([^&=]+)=([^&]*)/g, m;
	  while (m = regex.exec(queryString)) {
	    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	  }
	  
	  //store params in localStorage
	  localStorage.setItem('params', params);	
}