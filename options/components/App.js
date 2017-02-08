import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import {connect} from 'react-redux';
import SplashScreen from './SplashScreen';
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
    return (
        <MuiThemeProvider>
          { !this.props.accessToken ? <SplashScreen /> :
            (<div>
              <h1>Get [F]it Done</h1>
              <Tabs selected={0} className="tabs">
                <Tab label="Settings" className="tab">
                  <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} handleModesSubmit= {this.handleModesSubmit} websites={this.props.websites}/>
                </Tab>
                <Tab label="Achievements" className="tab">
                  <Achievements />
                </Tab>
              </Tabs>
            </div>)
          }
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state)
  return{
    websites: state.settings && state.settings.websites,
    accessToken: state.user && state.user.accessToken
  };
};


export default connect(mapStateToProps)(App);






