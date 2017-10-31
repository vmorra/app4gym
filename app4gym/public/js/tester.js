//tester.js
angular
.module('app')
.controller('testerCtrl', testerCtrl)

testerCtrl.$inject = ['$scope','$timeout','$http'];
function testerCtrl($scope,$timeout,$http) {
	  $scope.playlistmode = true;
	  console.log("controller loaded");
	  var API_KEY = "AIzaSyAMkHWnLNAvpKte-XA9nh3RheX7lFn_dNM";
	  var YOUR_CLIENT_ID = '662672391959-7u2ejqfcrn6b1ludoitifdhv4vkoakdo.apps.googleusercontent.com';
	  var YOUR_REDIRECT_URI = 'http://localhost:3000';
	  var accountId = "";
	  
	  $scope.playlists = [];
	  $scope.playlistItems = {};

	 params = JSON.parse(localStorage.getItem('params'));
	 
	  if (localStorage.getItem('params')){
	    exchangeOAuth2Token(params);
	    localStorage.setItem('params','');
	  }
	  
	  angular.element('#modal-youtube').on('hide.bs.modal', function (event) {
		  console.log("cello");
		$scope.playlistmode = true;
	  })
	  
	  // If there's an access token, try an API request.
	  // Otherwise, start OAuth 2.0 flow.
	  $scope.getUserChannel = function(){
	    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
	    if (params && params['access_token']) {
	      var xhr = new XMLHttpRequest();
	      xhr.open('GET',
	          'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&' +
	          'access_token=' + params['access_token']);
	      xhr.onreadystatechange = function (e) {
	        
	        if (xhr.status == 401) {
	        	oauth2SignIn();
	        }
	        else if (xhr.readyState == 4 &&
	                    xhr.status == 200) {
	        	//console.log(xhr.response);
	        	$scope.getPlayList('snippet,contentDetails', {'maxResults': '25'});
	        } 
	      };
	      xhr.send(null);
	    } else {
	      oauth2SignIn();
	    }
	  }
	  
	  /*
	   * Get list of Playlist associated with channel
	   */
	  
	  $scope.goToPlayList = function(id){
		
		  	var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
			getPlayListItems = $http({
		  	  	method: 'GET',
		  	  	headers:{"Authorization": "Bearer "+params['access_token']},
			  	url: 'https://www.googleapis.com/youtube/v3/playlistItems?' +
		          'maxResults=' + '25'+'&part=' + 'snippet,contentDetails'+'&playlistId='+id+
		          '&access_token=' + params['access_token']
			}).then(function success(response){
				
	    	  	$scope.playlistItems = response.data.items;
	    	  	
			  	console.log("json playlist"+JSON.stringify($scope.playlistItems));
			  	
	    	  	$scope.playlistmode = false;
			},function error(response){
			});
	}
	  $scope.getPlayList = function(part, par){
		  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
	      
	      callPlaylists = $http({
	  	  	method: 'GET',
	  	  	headers:{"Authorization": "Bearer "+params['access_token']},
		  	url: 'https://www.googleapis.com/youtube/v3/playlists?' +
	          'mine=true&maxResults=' + par['maxResults']+'&part=' + part+
	          '&access_token=' + params['access_token']
		}).then(function success(response){
			
    	  	$scope.playlists = response.data.items;
    	  	
		  	//console.log("json playlist"+JSON.stringify($scope.playlists));
		  	
		  	angular.element("#modal-youtube").modal('show');
		},function error(response){
		});
	      
	  }

	  /*
	   * Create form to request access token from Google's OAuth 2.0 server.
	   */
	  function oauth2SignIn() {
	    // Google's OAuth 2.0 endpoint for requesting an access token
	    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

	    // Create element to open OAuth 2.0 endpoint in new window.
	    var form = document.createElement('form');
	    form.setAttribute('method', 'GET'); // Send as a GET request.
	    form.setAttribute('action', oauth2Endpoint);

	    // Parameters to pass to OAuth 2.0 endpoint.
	    var params = {'client_id': YOUR_CLIENT_ID,
	                  'redirect_uri': YOUR_REDIRECT_URI,
	                  'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
	                  'state': 'try_sample_request',
	                  'include_granted_scopes': 'true',
	                  'response_type': 'token'};

	    // Add form parameters as hidden input values.
	    for (var p in params) {
	      var input = document.createElement('input');
	      input.setAttribute('type', 'hidden');
	      input.setAttribute('name', p);
	      input.setAttribute('value', params[p]);
	      form.appendChild(input);
	    }

	    // Add form to page and submit it to open the OAuth 2.0 endpoint.
	    document.body.appendChild(form);
	    form.submit();
	  }

	  /* Verify the access token received on the query string. */
	  function exchangeOAuth2Token(params) {
	    var oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
	    if (params['access_token']) {
	      var xhr = new XMLHttpRequest();
	      xhr.open('POST', oauth2Endpoint + '?access_token=' + params['access_token']);
	      xhr.onreadystatechange = function (e) {
	    	if(xhr.responseText != ""){
	    	   var response = JSON.parse(xhr.response);
	    	}
	        // When request is finished, verify that the 'aud' property in the
	        // response matches YOUR_CLIENT_ID.
	        if (xhr.readyState == 4 &&
	            xhr.status == 200 &&
	            response['aud'] &&
	            response['aud'] == YOUR_CLIENT_ID) {
	          // Store granted scopes in local storage to facilitate
	          // incremental authorization.
	          params['scope'] = response['scope'];
	          localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
	          if (params['state'] == 'try_sample_request') {
	        	  $scope.getUserChannel();
	          }
	        } else if (xhr.readyState == 4) {
	          console.log('There was an error processing the token, another ' +
	                      'response was returned, or the token was invalid.')
	        }
	      };
	      xhr.send(null);
	    }
	  }
}