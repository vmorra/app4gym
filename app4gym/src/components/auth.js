class AuthService{

  static requireAuth() {
    if (!localStorage.getItem('jwttoken')){
      //console.log("Not Authenticated User");
      //console.log(JSON.stringify(sessionStorage));
      return true;
    }
    else{
      //console.log("Authenticated User");
      //console.log(JSON.stringify(sessionStorage));
      return false;
    }
  }

  static populateUserSession(data){
    localStorage.setItem('jwttoken', data.token);
    localStorage.setItem('uprofile', JSON.stringify(data.user));
  }

  static clearUserSession(){
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('uprofile');
  }

  static getUserSession(){
    if (localStorage.getItem('uprofile')!=null){
    	return localStorage.getItem('uprofile');
    }
    else return "{}";
  }
}

export { AuthService as default}
