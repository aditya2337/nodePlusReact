import React, {Component} from 'react';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      firstName: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount () {
    fetch(`http://localhost:3001`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(blob => blob.json())
      .then(res => {
        if (res.authenticated) {
          this.setState({
            isLoggedIn: true,
            firstName: res.user[0].first_name
          });
        }
      });
  }

  handleLogout (e) {
    e.preventDefault();
    fetch(`http://localhost:3001/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(blob => blob.json())
    .then(res => {
      if (!res.authenticated) {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }

  onFormSubmit (e) {
    e.preventDefault();
    const { username, password } = this.refs;
    fetch(`http://localhost:3001/login?username=${username.value}&password=${password.value}`, {
      credentials: 'include',
      method: 'post'
    })
      .then(blob => blob.json())
      .then(res => {
        if (res.authenticated) {
          this.setState({
            isLoggedIn: true,
            firstName: res.user[0].first_name
          });
        }
      });
  }

  render () {
    const {isLoggedIn, firstName} = this.state;
    let button = null;
    if (isLoggedIn) {
      button = (
        <div>
          <p>Welcome {firstName}!</p>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      button = (
        <form onSubmit={this.onFormSubmit}>
          <div>
            <label>Email:</label>
            <input type='text' ref='username' />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' ref='password' />
          </div>
          <div>
            <input type='submit' value='Log In' />
          </div>
        </form>);
    }
    return (
      <div>
        {button}
      </div>
    );
  }
}
