class AuthService{

  static requireAuth() {
    if (!sessionStorage.getItem('jwttoken')){
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
    sessionStorage.setItem('jwttoken', data.token);
    sessionStorage.setItem('uprofile', data.user);
  }

  static clearUserSession(){
    sessionStorage.removeItem('jwttoken');
    sessionStorage.removeItem('uprofile');
  }

  static getUserSession(){
    return sessionStorage.getItem('uprofile');
  }
}

export { AuthService as default}
