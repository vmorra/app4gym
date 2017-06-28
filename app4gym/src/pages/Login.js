
import React, { Component } from 'react';
import * as rb from 'react-bootstrap';
import {default as UUID} from "node-uuid";
import { Redirect } from 'react-router';
import AuthService from '../components/auth'

class Login extends Component {

    constructor(props) {
       super(props);


       this.state = {
                      redirect: false
                    }

       this.handleChangeAccountName = this.handleChangeAccountName.bind(this);
       this.handleChangePwd = this.handleChangePwd.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
      event.preventDefault();
      console.log("Email "+ this.state.accountname);
      console.log("Pwd "+ this.state.pwd);
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

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <rb.Grid>
        <rb.Row>
          <rb.PageHeader>App4Gym <small>New App for Gymnastic</small></rb.PageHeader>
        </rb.Row>
        <rb.Row className="show-grid">
          <rb.Col sm={6} md={4} mdOffset={4}>
            <rb.Form horizontal onSubmit={this.handleSubmit}>
              <rb.FormGroup controlId="formHorizontalEmail">
                <rb.Col componentClass={rb.ControlLabel} sm={3}>
                  Account
                </rb.Col>
                <rb.Col sm={9}>
                  <rb.FormControl type="input" placeholder="Account Name" onChange={this.handleChangeAccountName} />
                </rb.Col>
              </rb.FormGroup>

              <rb.FormGroup controlId="formHorizontalPassword">
                <rb.Col componentClass={rb.ControlLabel} sm={3}>
                  Password
                </rb.Col>
                <rb.Col sm={9}>
                  <rb.FormControl type="password" placeholder="Password" onChange={this.handleChangePwd} />
                </rb.Col>
              </rb.FormGroup>

              <rb.FormGroup>
                <rb.Col smOffset={2} sm={10}>
                  <rb.Checkbox>Remember me</rb.Checkbox>
                </rb.Col>
              </rb.FormGroup>

              <rb.FormGroup>
                <rb.Col smOffset={2} sm={10}>
                  <rb.Button bsStyle="primary" type="submit">
                    Sign in
                  </rb.Button>
                </rb.Col>
              </rb.FormGroup>
            </rb.Form>
          </rb.Col>
        </rb.Row>
    </rb.Grid>


    );
  }
}

export default Login;
