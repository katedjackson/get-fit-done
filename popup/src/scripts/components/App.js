import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignIn from './SignIn'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello World
        <SignIn />
      </div>
    );
  }
}

export default App;
