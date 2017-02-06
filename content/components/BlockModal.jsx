import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';
import {connect} from 'react-redux';
import { unblock } from '../../background/reducers/block';
import { resetTime } from '../../background/reducers/time';
import { resetLastSteps, addFailure } from '../../background/reducers/user';

class BlockModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
    // this.getSteps = this.getSteps.bind(this);
    this.unblock = this.unblock.bind(this);
  }

  unblock() {
    let date = 'setting failure';
    this.props.dispatch(unblock());
    this.props.dispatch(resetTime());
    this.props.dispatch(resetLastSteps());
    this.props.dispatch(addFailure(date));
    console.log(this.props.failures);
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }

  render(){
    return (
    <div id="block-overlay-container" className="block-cursor block-select block-overlay-container">
      <div id="block-overlay" className="block-cursor block-select block-overlay">
        <div id="block-info-container" className="block-cursor block-select block-info-container">
          <span id="block-overlay-top-text" className="block-cursor block-select block-overlay-top-text">{`You need ${this.props.stepGoal-(this.props.steps - this.props.lastSteps)} more steps to unlock this page...`}</span>
          <div id="block-tree-ball" className="block-tree-ball">
            <ProgressBar {...this.props}/>
          </div>
          <div id="block-giveup-button" className="block-cursor block-select block-giveup-button block-buttons" onClick={this.giveUpToggle}>Give Up</div>
          <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
          <GiveUpPopUp {...this.props} showPopup={this.state.showPopup} giveUpToggle={this.giveUpToggle} unblock={this.unblock}/>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.stepGoal,
    failures: state.user && state.user.failures
  };
};

export default connect(mapStateToProps)(BlockModal);

