import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';

import { setWebsites, setStepGoal } from '../../background/reducers/settings';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
    this.handleModesSubmit = this.handleModesSubmit.bind(this);
  }

  handleWebsiteSubmit (evt) {
    const websites = evt.target.websites.value;
    evt.preventDefault();
    this.props.dispatch(setWebsites(websites));
  }

  handleModesSubmit (evt) {
    //const websites = evt.target.websites.value;
    //instead reset every state.settings
    const stepGoal = evt.target.hourlyStepsNum.value;
    evt.preventDefault();
    this.props.dispatch(setStepGoal(stepGoal));
  }

  render() {
    console.log('from app.js: ', this.props)
    return (
      <MuiThemeProvider>
        <div>
          <p><img className='logo' src='../logo.png' /></p>
          <Tabs selected={0} className="tabs">
            <Tab label="Settings" className="tab">
              <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} handleModesSubmit= {this.handleModesSubmit} websites={this.props.websites}/>
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

const mapStateToProps = (state) => {
  console.log('state: ', state)
  return{
    websites: state.settings && state.settings.websites
    //hourlySteps: state.hourlySteps
  };
};


export default connect(mapStateToProps)(App);






