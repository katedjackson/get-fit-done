import React, {Component} from 'react';
import {connect} from 'react-redux';
import Blocked from './Blocked';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.user ? <Blocked /> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {};
};

export default connect(mapStateToProps)(App);
