import React, {Component} from 'react';
import {connect} from 'react-redux';

import Blocked from './Blocked';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Blocked />
    );
  }
}

export default App;
