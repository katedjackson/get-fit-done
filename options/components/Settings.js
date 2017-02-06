import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toggle, TextField, TimePicker,
         SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Col, Row } from 'react-bootstrap';

import { setBlacklist, setWhitelist, toggleDisableTimeMode } from '../../background/reducers/settings'

import WebsitesList from './WebsitesList'
import DisabledTime from './DisabledTime'
import HourlyMode from './HourlyMode'
import TimeStepsMode from './TimeStepsMode'
import SleepMode from './SleepMode'

injectTapEventPlugin();

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      hourlySteps: false,
      dailySteps: false,
      foodLog: false,
      waterLog: false,

      hourlyStepsNum: '250',
      dailyStepsNum: '0',

      disabledTime: [], //[start, end]
      dailyGoalTime: null,
      foodLogTime: [],
      waterLogTime: []
    }
    //this.onLoad = this.onLoad.bind(this);
    this.renderModes = this.renderModes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);


  }

  // onLoad =() => {
  //   chrome.storage.sync.get({ websites: '' }, (items) => this.setState({ websites: items.websites }));
  // };


  renderModes = (name, label, toggleFunc, defaultToggle) => {
    return (<Toggle name={name} label={label}
                   labelPosition="right"
                   onToggle={toggleFunc}
                   defaultToggled={defaultToggle} />)
  };

  renderTimeSelect = (id, label, handleTimeChange, val) => {
    return (<SelectField id={id}
                         floatingLabelText={label}
                         value={val}
                         onChange={handleTimeChange}
                         maxHeight ={200}>
              <MenuItem value={'00:00'} primaryText="12:00 am" />
              <MenuItem value={'01:00'} primaryText="1:00 am"/>
              <MenuItem value={'02:00'} primaryText="2:00 am"/>
              <MenuItem value={'03:00'} primaryText="3:00 am"/>
              <MenuItem value={'04:00'} primaryText="4:00 am"/>
              <MenuItem value={'05:00'} primaryText="5:00 am"/>
              <MenuItem value={'06:00'} primaryText="6:00 am"/>
              <MenuItem value={'07:00'} primaryText="7:00 am"/>
              <MenuItem value={'08:00'} primaryText="8:00 am"/>
              <MenuItem value={'09:00'} primaryText="9:00 am"/>
              <MenuItem value={'10:00'} primaryText="10:00 am" />
              <MenuItem value={'11:00'} primaryText="11:00 am" />
              <MenuItem value={'12:00'} primaryText="12:00 pm" />
              <MenuItem value={'13:00'} primaryText="1:00 pm"/>
              <MenuItem value={'14:00'} primaryText="2:00 pm"/>
              <MenuItem value={'15:00'} primaryText="3:00 pm"/>
              <MenuItem value={'16:00'} primaryText="4:00 pm"/>
              <MenuItem value={'17:00'} primaryText="5:00 pm"/>
              <MenuItem value={'18:00'} primaryText="6:00 pm"/>
              <MenuItem value={'19:00'} primaryText="7:00 pm"/>
              <MenuItem value={'20:00'} primaryText="8:00 pm"/>
              <MenuItem value={'21:00'} primaryText="9:00 pm"/>
              <MenuItem value={'22:00'} primaryText="10:00 pm" />
              <MenuItem value={'23:00'} primaryText="11:00 pm" />
            </SelectField>
            );
  }

  render() {
    console.log("settings Component: ",this.props.websites);
    console.log(typeof this.props.websites);

    return (
      <div>
        <Col lg={6} md={6} sm={12} xs={12} className="setting_div">
          <WebsitesList handleWebsiteSubmit={this.props.handleWebsiteSubmit}/>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="setting_div">
              <legend><label>Modes: </label></legend>
                    <DisabledTime renderModes={this.renderModes} renderTimeSelect={this.renderTimeSelect}/>
                    <HourlyMode renderModes={this.renderModes}/>
                    <TimeStepsMode renderModes={this.renderModes}
                      renderTimeSelect={this.renderTimeSelect}/>
                    <SleepMode renderModes={this.renderModes}
                      renderTimeSelect={this.renderTimeSelect}/>
                    {/*<div>
                      {this.renderModes('foodLog', ' Food Log')}
                              {this.state.foodLog ? (
                              <div>
                              {this.renderTimeSelect('foodLogTime', 'Select Time')}
                              </div>) : null}
                    </div>
                    <div>
                      {this.renderModes('waterLog', ' Water Log')}
                              {this.state.waterLog ? (
                              <div>
                              {this.renderTimeSelect('waterLogTime', 'Select Time')}
                              </div>) : null}
                    </div>*/}
        </Col>
      </div>

    );
  }
}

Settings.propTypes = {
  handleWebsiteSubmit: PropTypes.func
}


const mapStateToProps = (state) => {
  return{
    websites: state.settings && state.settings.websites,
    stepGoal: state.settings && state.settings.stepGoal,
    blacklist: state.settings && state.settings.blacklist,
    disabledTimeMode: state.settings && state.settings.disabledTimeMode,
    startDisableTime: state.settings && state.settings.startDisableTime,
    stopDisableTime: state.settings && state.settings.stopDisableTime
  };
};


export default connect(mapStateToProps)(Settings);
