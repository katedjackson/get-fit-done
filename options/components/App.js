import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import Tabs from './Tabs';
import Pane from './Pane';
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
              <p><img className='logo' src='../logo.png' /></p>
              <div>
                <Tabs selected={0} className="tabs">
                  <Pane label="Settings" className="tab">
                    <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} handleModesSubmit= {this.handleModesSubmit} websites={this.props.websites}/>
                  </Pane>
                  <Pane label="Achievements" className="tab">
                    <Achievements />
                  </Pane>
                  <Pane label="Feedback" className="tab">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeYgRVbmicAGh8XkKzBx2JB_I0Q0z3m5r2atTbHhIrUWeIHAg/viewform?embedded=true" width="1381" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
                  </Pane>
                </Tabs>
              </div>
            </div>)
          }
        </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    websites: state.settings && state.settings.websites,
    accessToken: state.user && state.user.accessToken
  };
};

export default connect(mapStateToProps)(App);
