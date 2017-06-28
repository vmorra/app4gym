import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './pages/Login';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter as Router,
  Route,
  Link} from 'react-router-dom'



ReactDOM.render((
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker();
