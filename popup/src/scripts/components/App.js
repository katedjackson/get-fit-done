import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Blocked />
        Hello World
        <button id="sign-in">Sign In</button>
      </div>
    );
  }
}

export default App;
