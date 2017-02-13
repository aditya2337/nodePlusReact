import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  StaticRouter,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: null,
      users: []
    };
  }

  componentWillMount () {
    fetch('http://localhost:3001')
     .then(blob => blob.json()).then(res => {
       this.setState({
         title: res.title,
         users: res.users
       });
     });
  }

  render () {
    const {users, title} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {users ? (
            users.map(user => (
              <li key={user._id}>
                <Link to={`tweets/${user.id}`}>{user.username || '[no description]'}</Link>
              </li>
            ))
          ) : (
            <div>loading...</div>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
