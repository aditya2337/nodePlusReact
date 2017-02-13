import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './App';
import Tweets from './Tweets';

export default class Routes extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/tweets' component={Tweets} />
        </div>
      </Router>
    );
  }
}
