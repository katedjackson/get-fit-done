import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import Tabs from './Tabs';
import Pane from './Pane';
import SplashScreen from './SplashScreen';
import Footer from './Footer';
import { setWebsites, setStepGoal } from '../../background/reducers/settings';
import { logoutUser, loginUser, getWeeklySteps } from '../../background/reducers/user';
import { resetBlock } from '../../background/reducers/block';
import { resetSettings } from '../../background/reducers/settings';
import { resetTime } from '../../background/reducers/time';
import { fitbitLogout, fitbitAuth } from '../../background/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
    this.handleModesSubmit = this.handleModesSubmit.bind(this);
    this.signout = this.signout.bind(this);
    this.login = this.login.bind(this);
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

  login () {
    fitbitAuth()
      .then(accessToken => {
        this.props.dispatch(loginUser(accessToken))
      })
      .then(() => {
        this.props.dispatch({ type: 'getChartSteps' })
      })
  }

  signout() {
    fitbitLogout();
    this.props.dispatch(resetTime());
    this.props.dispatch(resetSettings());
    this.props.dispatch(resetBlock());
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
        <MuiThemeProvider>
          <Grid>
            <Row>
              { !this.props.accessToken ? <SplashScreen login={this.login}/> :
                (<div>
                  <p><img className='logo' src='/images/logo.png' /></p>
                  <Tabs selected={0} className="tabs">
                    <Pane label="Settings" className="tab">
                      <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} handleModesSubmit={this.handleModesSubmit} websites={this.props.websites} signout={this.signout} />
                    </Pane>
                    <Pane label="Achievements" className="tab">
                      <Achievements />
                    </Pane>
                    <Pane label="Feedback" className="tab feedback">
                      <iframe className="feedback-form" src="https://docs.google.com/forms/d/e/1FAIpQLSeYgRVbmicAGh8XkKzBx2JB_I0Q0z3m5r2atTbHhIrUWeIHAg/viewform?embedded=true" width="1381" height="600" frameBorder="0" marginHeight="0" marginWidth="0">Loading...</iframe>
                    </Pane>
                  </Tabs>
                </div>)
              }
            </Row>
            <Row>
              <Footer signout={this.signout} login={this.login} accessToken={this.props.accessToken}/>
            </Row>
          </Grid>
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
