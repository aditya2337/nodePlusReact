import React, {Component} from 'react';

export default class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoggedIn: true
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount () {
    fetch(`http://localhost:3001`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(blob => blob.json())
      .then(res => {
        if (!res.authenticated) {
          this.setState({isLoggedIn: false}); 
        }
        console.log(res);
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
          this.setState({isLoggedIn: true});
        }
        console.log(res);
      });
  }

  render () {
    const {isLoggedIn} = this.state;

    if (isLoggedIn) {
      return (<p>Welcome</p>);

    } else {
      return (
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
        </form>
      );
    }
  }
}
