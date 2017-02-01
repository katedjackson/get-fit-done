import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';

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
      <MuiThemeProvider>
        <div>
          <Tabs selected={0} className="tabs">
            <Tab label="Settings" className="tab">
              <Settings handleWebsiteSubmit={this.handleWebsiteSubmit}/>
            </Tab>
            <Tab label="Achievements" className="tab">
              <Achievements />
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
