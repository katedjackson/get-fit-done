import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
import GiveUpPopUp from './GiveUpPopUp';

class BlockModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }

  render(){
    return (
    <div id="block-overlay-container" className="block-cursor block-select block-overlay-container">
      <div id="block-overlay" className="block-cursor block-select block-overlay">
        <div id="block-info-container" className="block-cursor block-select block-info-container">
          <span id="block-overlay-top-text" className="block-cursor block-select block-overlay-top-text">You need 93 more steps to unlock this page...</span>
          <div id="block-tree-ball" className="block-tree-ball">
            <ProgressBar />
          </div>
          <div id="block-giveup-button" className="block-cursor block-select block-giveup-button block-buttons" onClick={this.giveUpToggle}>Give Up</div>
          <div id="block-popup-mask" className="block-cursor block-select block-popup-mask block-disappear"></div>
          <GiveUpPopUp {...this.props} showPopup={this.state.showPopup} giveUpToggle={this.giveUpToggle}/>
        </div>
      </div>
    </div>
    )
  }
}

export default BlockModal
