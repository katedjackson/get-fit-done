import React, {Component} from 'react';
import {connect} from 'react-redux';
import Blocked from './Blocked';
import Unblocked from './Unblocked';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocked: true
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.blocked ? <Blocked /> : <Unblocked />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
  };
};

export default connect(mapStateToProps)(App);
