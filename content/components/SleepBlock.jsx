import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';
import {connect} from 'react-redux';
import { giveup, toggleSleepExt, toggleStayUp, toggleSleepBlock} from '../../background/reducers/block';
import { resetTime } from '../../background/reducers/time';
import { resetLastSteps, resetStreak } from '../../background/reducers/user';
//import { checkBlockState } from '../../background/utils/blockingUtils'

import ExtensionPopUp from './ExtensionPopUp';
import StayUpPopUp from './StayUpPopUp';

class HourlyBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showExtensionPopup: false,
      showGiveUpPopup: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
    this.extensionToggle = this.extensionToggle.bind(this);
    this.unblock = this.unblock.bind(this);
    this.extend = this.extend.bind(this);
  }

  unblock() {
    this.props.dispatch(toggleStayUp());
    this.props.dispatch(toggleSleepBlock());
    this.props.dispatch(resetTime());
    this.props.dispatch(resetLastSteps());
    this.props.dispatch(resetStreak());
  }

  giveUpToggle(){
    this.setState({showGiveUpPopup: this.state.showGiveUpPopup ? false : true})
  }

 extensionToggle(){
    this.setState({showExtensionPopup: this.state.showExtensionPopup ? false : true})
  }

  extend(){
    this.props.dispatch(toggleSleepExt());
    this.props.dispatch(toggleSleepBlock());
  }

  render() {
    return(
      <div>
        <span id="block-overlay-top-text" className="block-cursor block-select block-overlay-top-text">{`It's time for bed. Get some sleep!`}</span>
        <div id="block-progress" className="block-progress">
          <img className='sleep' src='https://i.imgur.com/KXY2b8V.png' />
        </div>
        <div id="block-giveup-button" className="block-cursor block-select block-giveup-button block-buttons" onClick={this.extensionToggle}>5 More Minutes</div>
        <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
        <ExtensionPopUp {...this.props} showPopup={this.state.showExtensionPopup} extensionToggle={this.extensionToggle} extend={this.extend}/>
        <div id="block-giveup-button" className="block-cursor block-select block-giveup-button block-buttons" onClick={this.giveUpToggle}>Stay Up</div>
        <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
        <StayUpPopUp {...this.props} showPopup={this.state.showGiveUpPopup} giveUpToggle={this.giveUpToggle} unblock={this.unblock}/>
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
    streak: state.user && state.user.streak
  };
};

export default connect(mapStateToProps)(HourlyBlock);

