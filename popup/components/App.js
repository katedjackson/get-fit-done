import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import ProgressBar from './ProgressBar';
import TotalProgress from './TotalProgress';
import SleepTime from './SleepTime';
import Disabled from './Disabled';
import NoMode from './NoMode';
import { Row } from 'react-bootstrap';
import { incrementRefresh } from '../../background/reducers/user';
import { toggleHourlyBlock, toggleTimeStepsBlock } from '../../background/reducers/block';

class App extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.loginView = this.loginView.bind(this);
    this.signedInView = this.signedInView.bind(this);
  }

  refresh(){
    let t = new Date();
    let time = t.toString().slice(16, 21);

    if (this.props.timesRefreshed < 10){
      this.props.dispatch(incrementRefresh());
      this.props.dispatch({type: 'getSteps'})
      .then(() => {
        if (this.props.hourlyBlock && this.props.blocked){
          if (this.props.steps - this.props.lastSteps >= this.stepGoal){
            this.props.dispatch(toggleHourlyBlock());
          }
        }
        if (this.props.timeStepsMode && this.props.timeStepsBlock){
          if (this.props.steps >= this.props.totalStepGoal){
            this.props.dispatch(toggleTimeStepsBlock());
          }
        }
      })
    }
  }

  loginView(){
    return (
      <div className="popup-login">
        <Row>
          <img className='logo' src='/images/logo.png' />
        </Row>
        <Row>
          <a title='Login' target='_blank' href='chrome-extension://fecjgkehmgognabbnohaoombfboddooo/options/index.html'><img className='popup-login' src='/images/login.png' /></a>
        </Row>
      </div>
    )
  }

  signedInView(){
    let blockMode = null;
    if (this.props.disableBlock) blockMode = 'disableBlock';
    else if (this.props.blocked || this.props.timeStepsBlock || this.props.sleepBlock){
      if (this.props.sleepBlock) blockMode = 'sleepBlock';
      else if (this.props.timeStepsBlock) blockMode = 'timeStepsBlock';
      else if (this.props.blocked) blockMode = 'hourlyMode';
    }
    else{
      if (this.props.hourlyMode) blockMode = 'hourlyMode';
      else if (this.props.timeStepsMode) blockMode = 'timeStepsBlock';
      else if (this.props.sleepMode) blockMode = 'sleepBlock';
      else blockMode = 'noMode'
    }
    return (
      <div>
        <Row>
          <a title={(10 - this.props.timesRefreshed) + ' refreshes left this hour'} target="_blank" onClick={this.refresh}><img className="refresh" src="/images/refresh.png" /></a>
          <a title="Settings" target="_blank" href="chrome-extension://fecjgkehmgognabbnohaoombfboddooo/options/index.html"><img className="settings" src="/images/settingsIcon.png" /></a>
        </Row>
        <Row className="popup-container">
          <Row>
            <img className="logo" src="/images/logo.png" />
          </Row>
          <Row>
            { blockMode === 'disableBlock' && <Disabled />}
            { blockMode === 'sleepBlock' && <SleepTime /> }
            { blockMode === 'timeStepsBlock' && <TotalProgress /> }
            { blockMode === 'hourlyMode' && <ProgressBar />}
            { blockMode === 'noMode' && <NoMode />}
          </Row>
        </Row>
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

App.propTypes = {
  accessToken: PropTypes.string,
  blocked: PropTypes.bool,
  steps: PropTypes.number,
  lastSteps: PropTypes.number,
  stepGoal: PropTypes.string,
  timesRefreshed: PropTypes.number,
  sleepBlock: PropTypes.bool,
  timeStepsBlock: PropTypes.bool,
  hourlyMode: PropTypes.bool,
  disableBlock: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.user && state.user.accessToken,
    blocked: state.block && state.block.hourlyBlock,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.stepGoal,
    timesRefreshed: state.user && state.user.timesRefreshed,
    sleepBlock: state.block && state.block.sleepBlock,
    timeStepsBlock: state.block && state.block.timeStepsBlock,
    hourlyMode: state.settings && state.settings.hourlyMode,
    disableBlock: state.block && state.block.disable,
    sleepMode: state.settings && state.settings.sleepMode,
    timeStepsMode: state.settings && state.settings.timeStepsMode,
    totalStepGoal: state.settings && state.settings.totalStepGoal
  };
};

export default connect(mapStateToProps)(App);
