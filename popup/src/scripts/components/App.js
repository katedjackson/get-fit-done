import React, {Component} from 'react';
import {connect} from 'react-redux';

import Blocked from './Blocked';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
