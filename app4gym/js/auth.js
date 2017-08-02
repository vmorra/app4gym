angular
.module('app')
.service('auth', function() {
    this.requireAuth = function () {
    	if (!localStorage.getItem('jwttoken')){    	     
    	   return true;
    	}
    	else{
    	   return false;
    	}
    }
    
    this.populateUserSession = function(data){
        localStorage.setItem('jwttoken', data.token);
        localStorage.setItem('uprofile', JSON.stringify(data.user));
    }
    
    this.clearUserSession = function(){
    	localStorage.removeItem('jwttoken');
        localStorage.removeItem('uprofile');
    }
    
    this.getUserSession = function(){
	    if (localStorage.getItem('uprofile')!=null){
	    	return localStorage.getItem('uprofile');
	    }
	    else return "{}";
	}
    
    this.getJWTToken = function(){
	    if (localStorage.getItem('jwttoken')!=null){
	    	return localStorage.getItem('jwttoken');
	    }
	    else return "{}";
	}
    
});