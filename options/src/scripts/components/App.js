import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import Tabs from './Tabs';
import Pane from './Pane';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
  }

  handleWebsiteSubmit (evt) {
    const websites = evt.target.websites.value;
    chrome.storage.sync.set({
        websites: websites
    }, function() {
      // chrome.runtime.reload();
    })
  }

  render() {
    return (
      <div>
        <h1>Get [F]it Done</h1>
        <Tabs selected={0}>
          <Pane label="Settings">
            <Settings handleWebsiteSubmit={this.handleWebsiteSubmit}/>
          </Pane>
          <Pane label="Achievements">
            <Achievements />
          </Pane>
        </Tabs>
      </div>
    );
  }
};

export default App;
