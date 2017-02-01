import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import Tabs from './Tabs';
import Pane from './Pane';
import { connect } from 'react-redux';

import { setWebsites, updateWebsites } from '../../../../background/reducers/settings'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
  }

  handleWebsiteSubmit (evt) {
    const websites = evt.target.websites.value;
    evt.preventDefault();
    this.props.dispatch(setWebsites(websites));
    updateWebsites(websites);
  }


  render() {
    return (
      <div>
        <Tabs selected={0}>
          <Pane label="Settings">
            <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} websites={this.props.websites}/>
          </Pane>
          <Pane label="Achievements">
            <Achievements />
          </Pane>
        </Tabs>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    count: state.count,
    websites: state.websites,
    hourlySteps: state.hourlySteps
  };
};


export default connect(mapStateToProps)(App);






