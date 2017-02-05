import React, {Component} from 'react';
import {connect} from 'react-redux';
import Blocked from './Blocked';
import Unblocked from './Unblocked';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.blocked ? <Blocked /> : <Unblocked />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    blocked: state.block && state.block.showBlock
  };
};

export default connect(mapStateToProps)(App);
