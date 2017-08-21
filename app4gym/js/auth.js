angular
.module('app')
.service('auth', function() {
    this.requireAuth = function () {
    	if (!localStorage.getItem('logout_token')){    	     
    	   return true;
    	}
    	else{
    	   return false;
    	}
    }
    
    this.populateUserSession = function(data){
    	localStorage.setItem('current_user', JSON.stringify(data.current_user))
        localStorage.setItem('logout_token', JSON.stringify(data.logout_token));
    }
    
    this.clearUserSession = function(){
    	localStorage.removeItem('logout_token');
    	localStorage.removeItem('current_user');
    }
    
    this.getUserSession = function(){
	    if (localStorage.getItem('current_user')!=null){
	    	return localStorage.getItem('current_user');
	    }
	    else return "{}";
	}
    
    this.getLogoutToken = function(){
	    if (localStorage.getItem('logout_token')!=null){
	    	return localStorage.getItem('logout_token');
	    }
	    else return "{}";
	}
    
});