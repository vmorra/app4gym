angular
.module('app')
.service('auth', function() {
    this.requireAuth = function () {
    	if (!localStorage.getItem('access_token')){    	     
    	   return true;
    	}
    	else{
    	   return false;
    	}
    }
    
    this.populateUserSession = function(data, username){
    	localStorage.setItem('current_user', username);
        localStorage.setItem('access_token', data.access_token);
    	localStorage.setItem('refresh_token', data.refresh_token);
    }
    
    this.setUserInfo = function(data){
    	localStorage.setItem('userInfo', JSON.stringify(data));
    }
    
    this.clearUserSession = function(){
    	localStorage.removeItem('access_token');
    	localStorage.removeItem('refresh_token');
    	localStorage.removeItem('current_user');
    }
    
    this.getUserSession = function(){
	    if (localStorage.getItem('current_user')!=null){
	    	return localStorage.getItem('current_user');
	    }
	    else return "{}";
	}
    
    this.getUserInfo = function(){
	    if (localStorage.getItem('userInfo')!=null){
	    	return localStorage.getItem('userInfo');
	    }
	    else return "{}";
	}
    
    this.getAccessToken = function(){
	    if (localStorage.getItem('access_token')!=null){
	    	return localStorage.getItem('access_token');
	    }
	    else return "{}";
	}
    
    this.getRefreshToken = function(){
	    if (localStorage.getItem('refresh_token')!=null){
	    	return localStorage.getItem('refresh_token');
	    }
	    else return "{}";
	}
    
});