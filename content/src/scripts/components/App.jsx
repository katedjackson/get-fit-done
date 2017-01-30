import React, {Component} from 'react';
import ProgressBar from './ProgressBar';


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
      <div id="forest-overlay-container" className="forest-cursor forest-select forest-overlay-container">
        <div id="forest-overlay" className="forest-cursor forest-select forest-overlay">
          <div id="forest-info-container" className="forest-cursor forest-select forest-info-container">
            <span id="forest-overlay-top-text" className="forest-cursor forest-select forest-overlay-top-text">You need 107 more steps to unlock this page...</span>
            <div id="forest-tree-ball" className="forest-tree-ball"><ProgressBar /></div>
            <div id="forest-giveup-button" className="forest-cursor forest-select forest-giveup-button forest-buttons" onClick={this.giveUpToggle}>Give Up</div>
            <div id="forest-popup-mask" className="forest-cursor forest-select forest-popup-mask forest-disappear"></div>
            <div id="forest-popup" className={"forest-cursor forest-select forest-popup" + (!this.state.showPopup ? 'forest-popup-shrink forest-disappear' : '')}><div id="forest-popup-title" className="forest-cursor forest-select forest-popup-title">Are you sure you don't want to stretch your legs?</div><br/><div id="forest-popup-message" className="forest-cursor forest-select forest-popup-message">This will break your 3 day streak.</div><div id="forest-popup-confirm-button" className="forest-cursor forest-select forest-popup-confirm-button forest-buttons">Yes</div><div id="forest-popup-cancel-button" className="forest-cursor forest-select forest-popup-cancel-button forest-buttons" onClick={this.giveUpToggle}>No</div></div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
