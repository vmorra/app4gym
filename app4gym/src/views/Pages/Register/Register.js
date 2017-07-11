import React, { Component } from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';
import {default as UUID} from "node-uuid";
import { Redirect } from 'react-router';

class Register extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      accountname: '',
      email:'',
      password: '',
      repeatpassword: ''
    };
    this.onSubmit = this.onSubmit.bind( this );
    this.onResolved = this.onResolved.bind( this );
    this.handleChangeAccountName = this.handleChangeAccountName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRepeatPassword = this.handleChangeRepeatPassword.bind(this);
  }

  handleChangeAccountName(event) {
    console.log(event.target.value);
    this.setState({accountname: event.target.value});
  }

  handleChangeEmail(event) {
    console.log(event.target.value);
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  }
  handleChangeRepeatPassword(event) {
    console.log(event.target.value);
    if ( this.state.password == event.target.value ) {
      this.setState({repeatpassword: event.target.value});
    }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" className="form-control" placeholder="Username" onChange={this.handleChangeAccountName}/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" placeholder="Email" onChange={this.handleChangeEmail}/>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" onChange={this.handleChangePassword}/>
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Repeat password" onChange={this.handleChangeRepeatPassword}/>
                  </div>
                  <Recaptcha
                    ref={ ref => this.recaptcha = ref }
                    sitekey="6LcDvCgUAAAAAOOFtq4_mp_Fq5yNBtuVQlyHp-kZ"
                    onResolved={ this.onResolved } />
                  <button type="button" className="btn btn-block btn-success" onClick={ this.onSubmit }>Create Account</button>
                </div>
                <div className="card-footer p-4">
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
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
  onSubmit() {
   if ( '' == this.state.accountname || '' == this.state.email || '' == this.state.password || '' == this.state.repeatpassword ) {
     alert( 'Validation failed! Inputs cannot be empty.' );
     this.recaptcha.reset();
   } else {
     this.recaptcha.execute();
   }
 }
 onResolved() {
   alert( 'Recaptcha resolved with response: ' + this.recaptcha.getResponse() );
 }
}

export default Register;
