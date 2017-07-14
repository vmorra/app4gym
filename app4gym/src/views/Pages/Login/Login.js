import React, { Component } from 'react';
import {default as UUID} from "node-uuid";
import { Redirect } from 'react-router';
import AuthService from '../../../components/auth'

class Login extends Component {

  constructor(props) {
     super(props);

     this.state = {
                    accountname: '',
                    pwd:'',
                    redirect: false,
                    register: false
                  }

     this.handleChangeAccountName = this.handleChangeAccountName.bind(this);
     this.handleChangePwd = this.handleChangePwd.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChangeRedirect = this.handleChangeRedirect.bind(this);
     this.movetoregister = this.movetoregister.bind(this);
  }

  handleChangeRedirect(event){
	  this.setState({redirect: event.target.value});
  }

  handleChangeAccountName(event) {
    console.log(event.target.value);
    //this.setState({value: event.target.value});
    this.setState({accountname: event.target.value});
  }

  handleChangePwd(event) {
    console.log(event.target.value);
    //this.setState({value: event.target.value});
    this.setState({pwd: event.target.value});
  }

  movetoregister(event){
    this.setState({register: true});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Email "+ this.state.accountname);
    console.log("Pwd "+ this.state.pwd);
    if(this.state.accountname.trim()=='' || this.state.accountname.trim()==''){
      this.setState({cefan: true});
    }
    else{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Client-RequestId", UUID.v4());

      var myInit = { method: 'POST',
                     headers: myHeaders,
                     body: JSON.stringify({
                             username: this.state.accountname,
                             password: this.state.pwd
                           }),
                     mode: 'cors',
                     cache: 'default' };

      var myRequest = new Request('http://localhost:3001/api/auth/login', myInit);
      var component = this;
      return fetch(myRequest).then(response => {
          if(response.ok){
            response.json().then( data =>{
              AuthService.populateUserSession(data);
              console.log("Response Login "+JSON.stringify(data));
              component.setState({redirect:true});
              console.log("State" +JSON.stringify(component.state.redirect));
            });
          }
        });
    }

}

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/dashboard" />;
    }
    else if(this.state.register) {
      return <Redirect push to="/register" />;
    }
    var btnAccountNameClass = 'form-control';
    var inGrupoAccountNameClass = 'input-group mb-3';
    if (this.state.cefan) {
      btnAccountNameClass += ' form-control-danger';
      inGrupoAccountNameClass += ' has-danger';
    }
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className={inGrupoAccountNameClass}>
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className={btnAccountNameClass} placeholder="Username" onChange={this.handleChangeAccountName}/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Password" onChange={this.handleChangePwd}/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4" onClick={this.handleSubmit}>Login</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Join App4Gym Community</p>
                      <button type="button" className="btn btn-primary active mt-3" onClick={this.movetoregister}>Register Now!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
