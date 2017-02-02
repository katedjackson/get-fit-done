import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import {connect} from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }


  render() {
    return (
      <div id="block-overlay-container" className="block-cursor block-select block-overlay-container">
        <div id="block-overlay" className="block-cursor block-select block-overlay">
          <div id="block-info-container" className="block-cursor block-select block-info-container">
            <span id="block-overlay-top-text" className="block-cursor block-select block-overlay-top-text">You need 93 more steps to unlock this page...</span>
            <div id="block-tree-ball" className="block-tree-ball"><ProgressBar /></div>
            <div id="block-giveup-button" className="block-cursor block-select block-giveup-button block-buttons" onClick={this.giveUpToggle}>Give Up</div>
            <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
            <div id="block-popup" className={"block-cursor block-select block-popup" + (!this.state.showPopup ? 'block-popup-shrink block-disappear' : '')}><div id="block-popup-title" className="block-cursor block-select block-popup-title">Are you sure you don't want to stretch your legs?</div><br/><div id="block-popup-message" className="block-cursor block-select block-popup-message">This will break your 3 day streak.</div><div id="block-popup-confirm-button" className="block-cursor block-select block-popup-confirm-button block-buttons">Yes</div><div id="block-popup-cancel-button" className="block-cursor block-select block-popup-cancel-button block-buttons" onClick={this.giveUpToggle}>No</div></div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    steps: state.user.steps,
    stepGoal: state.settings.stepGoal
  };
};

export default connect(mapStateToProps)(App);
