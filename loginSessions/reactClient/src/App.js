import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Link to='login'><input type='button' value='login' /></Link>
      </div>
    );
  }
}

export default App;
