import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProgressBar from './ProgressBar';
import TotalProgress from './TotalProgress';
import SleepTime from './SleepTime';
import Login from './Login';
import { Row } from 'react-bootstrap';
import { incrementRefresh, getDailyThunk} from '../../background/reducers/user';
import { checkHourlyBlock, checkTimeSteps, checkSleepTime } from '../../background/utils/blockingUtils'

class App extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }


  refresh(){
    if (this.props.timesRefreshed < 10){
      this.props.dispatch(incrementRefresh());
      this.props.dispatch({type: 'getSteps'})
      .then(() => {
        var state = store.getState();
        if (state.settings.hourlyMode) checkHourlyBlock(state);
        if (state.settings.timeStepsMode) checkTimeSteps(state,time);
        if (state.settings.sleepMode) checkSleepTime(state, time);
      })
    }
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
    let blockMode = null;
    if (this.props.sleepBlock) blockMode = 'sleepBlock';
    else if (this.props.timeStepsBlock) blockMode = 'timeStepsBlock';
    else if (this.props.hourlyBlock) blockMode = 'hourlyBlock';

    return (
      <div>
      <Row>
        <a title={(10 - this.props.timesRefreshed) + ' refreshes left this hour'} target="_blank" onClick={this.refresh}><img className="refresh" src="../refresh.png" /></a>
        <a title="Settings" target="_blank" href="chrome-extension://fecjgkehmgognabbnohaoombfboddooo/options/index.html"><img className="settings" src="../settingsIcon.png" /></a>
      </Row>
      <Row className="popup-container">
        <Row>
          <img className="logo" src="../logo.png" />
        </Row>
        <Row>
          { blockMode === 'sleepBlock' && <SleepTime /> }
          { blockMode === 'timeStepsBlock' && <TotalProgress /> }
          { blockMode === 'hourlyBlock' && <ProgressBar />}
        </Row>
        <Row>
          <Login />
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
    hourlyBlock: state.block && state.block.hourlyBlock
  };
};

export default connect(mapStateToProps)(App);
