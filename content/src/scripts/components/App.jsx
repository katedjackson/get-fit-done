import React, {Component} from 'react';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="forest-overlay-container" className="forest-cursor forest-select forest-overlay-container">
        <div id="forest-overlay" className="forest-cursor forest-select forest-overlay">
          <div id="forest-info-container" className="forest-cursor forest-select forest-info-container">
            <span id="forest-overlay-top-text" className="forest-cursor forest-select forest-overlay-top-text">You need 107 more steps to unlock this page...</span>
            <div id="forest-giveup-button" className="forest-cursor forest-select forest-giveup-button forest-buttons">Give Up</div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
