import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/auth'
import { Redirect } from 'react-router'
import * as rb from 'react-bootstrap';

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {};
  }
  componentWillMount() {
    if(AuthService.requireAuth()){
      this.setState({authreq : true});
    }
  }

  render() {
    if (this.state.authreq) {
      return <Redirect push to="/login" />;
    }
    return (
      <rb.Grid>
        <rb.Row>
          <rb.PageHeader>App4Gym <small>New App for Gymnastic</small></rb.PageHeader>
        </rb.Row>
        <rb.Row className="show-grid">
          <rb.Col sm={6} md={4} mdOffset={4}></rb.Col>
        </rb.Row>
    </rb.Grid>
    );
  }
}

export default App;
