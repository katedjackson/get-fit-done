import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';
import {connect} from 'react-redux';
import { unblock } from '../../background/reducers/block';
import { resetTime } from '../../background/reducers/time';
import { resetLastSteps, resetStreak } from '../../background/reducers/user';
import { Col, Row } from 'react-bootstrap';

class HourlyBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
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

  render() {
    return(
      <div>
        <Row className="block-cursor block-select block-overlay-top-text">{`You need ${this.props.stepGoal-(this.props.steps - this.props.lastSteps)} more steps to unlock this page...`}</Row>
        <Row className="block-progress">
          <ProgressBar {...this.props}/>
        </Row>
        <Row className="button-row">
        <span className="block-cursor block-select block-giveup-button block-buttons" onClick={this.giveUpToggle}>Give Up</span>
        </Row>
        <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
        <GiveUpPopUp {...this.props} showPopup={this.state.showPopup} giveUpToggle={this.giveUpToggle} unblock={this.unblock}/>
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

