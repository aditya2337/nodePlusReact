import React, {Component} from 'react';

export default class Tweets extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: null,
      tweets: []
    };
  }

  componentWillMount () {
    fetch(`http://localhost:3001${window.location.pathname}`)
     .then(blob => blob.json()).then(res => {
       this.setState({
         title: res.title,
         tweets: res.tweets
       });
     });
  }

  render () {
    const {title, tweets} = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {tweets ? (
            tweets.map(tweet => (
              <li key={tweet._id}>
                {tweet.text || '[no description]'}
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
