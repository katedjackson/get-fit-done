import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';
import {connect} from 'react-redux';
import { unblock } from '../../background/reducers/block';
import { resetTime } from '../../background/reducers/time';
import { resetLastSteps, resetStreak } from '../../background/reducers/user';

import HourlyBlock from './HourlyBlock';
import TimeStepsBlock from './TimeStepsBlock';
import SleepBlock from './SleepBlock';

class BlockModal extends Component {
  constructor(props) {
    super(props)
    this.giveUpToggle = this.giveUpToggle.bind(this);
    this.unblock = this.unblock.bind(this);
  }

  unblock() {
    this.props.dispatch(unblock());
    this.props.dispatch(resetTime());
    this.props.dispatch(resetLastSteps());
    this.props.dispatch(resetStreak());
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }

  render(){
    let blockMode = null;
    if (this.props.sleepBlock) blockMode = 'sleepBlock';
    else if (this.props.timeStepsBlock) blockMode = 'timeStepsBlock';
    else if (this.props.hourlyBlock) blockMode = 'hourlyBlock';
    console.log("BlockMode: ", blockMode)
    return (
    <div id="block-overlay-container" className="block-cursor block-select block-overlay-container">
      <div id="block-overlay" className="block-cursor block-select block-overlay">
        <div id="block-info-container" className="block-cursor block-select block-info-container">
          { blockMode === 'sleepBlock' && <SleepBlock {...this.props} /> }
          { blockMode === 'timeStepsBlock' && <TimeStepsBlock {...this.props} /> }
          { blockMode === 'hourlyBlock' && <HourlyBlock {...this.props} /> }
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.stepGoal,
    streak: state.user && state.user.streak,
    sleepBlock: state.block && state.block.sleepBlock,
    timeStepsBlock: state.block && state.block.timeStepsBlock,
    hourlyBlock: state.block && state.block.hourlyBlock
  };
};

export default connect(mapStateToProps)(BlockModal);

