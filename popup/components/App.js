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
        <a title='Settings' target='_blank' href='chrome-extension://fecjgkehmgognabbnohaoombfboddooo/options/index.html'><img className='settings' src='../settingsIcon.png' /></a>
        <img className='logo' src='../logo.png' />
          { (this.props.steps - this.props.lastSteps)  >= this.props.stepGoal ? <h3 className='animated infinite tada'>Congrats you've reached your goal!</h3> :  <h3></h3>}
          {!this.props.blocked ? <h3>{timeLeft} minutes remaining</h3> :
          <h3>You need { this.props.stepGoal - (this.props.steps - this.props.lastSteps)} more steps to unlock</h3>}
          <ProgressBar />
          <Login />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.accessToken.length > 1 ? this.signedInView() : this.loginView()}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
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
