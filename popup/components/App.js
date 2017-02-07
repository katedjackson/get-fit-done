import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProgressBar from './ProgressBar';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className='popupBody'>
        <img className='logo' src='../logo.png' />

        {!this.props.blocked ? <h3>{this.props.timeLeft} minutes to get your steps!</h3> : < div />}
        <ProgressBar />


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    blocked: state.block && state.block.showBlock,
    timeLeft : state.user && state.time.timeLeft
  };
};

export default connect(mapStateToProps)(App);
