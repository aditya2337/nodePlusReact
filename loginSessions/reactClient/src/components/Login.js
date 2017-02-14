import React, {Component} from 'react';

export default class Login extends Component {
  constructor (props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit (e) {
    e.preventDefault();
    const { username, password } = this.refs;
    fetch(`http://localhost:3001/login?username=${username.value}&password=${password.value}`, {
      method: 'post'
    })
      .then(blob => blob.json())
      .then(res => {
        console.log(res);
      });
  }

  render () {
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
