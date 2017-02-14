import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './App';

export default class Routes extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}
