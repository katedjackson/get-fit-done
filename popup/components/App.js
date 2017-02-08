import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProgressBar from './ProgressBar';
import Login from './Login';


class App extends Component {
  constructor(props) {
    super(props);
  }

  loginView(){
    return (
      <div>
        <img className='logo' src='../logo.png' />
        <Login />
      </div>
    )
  }

  signedInView(){
    let timeLeft;
    if (this.props.timeLeft > 0) timeLeft = this.props.timeLeft;
    else timeLeft = 0;

    return (
      <div>
        <img className='logo' src='../logo.png' />
          {!this.props.blocked ? <h3>{timeLeft} minutes to get your steps!</h3> :
          <h3>You need { this.props.stepGoal - (this.props.steps - this.props.lastSteps)} more steps to unlock</h3>}
          <ProgressBar />
          <Login />
      </div>
    )
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.accessToken.length > 1 ? this.signedInView() : this.loginView()}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    blocked: state.block && state.block.showBlock,
    timeLeft : state.user && state.time.timeLeft,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.stepGoal

  };
};

export default connect(mapStateToProps)(App);
