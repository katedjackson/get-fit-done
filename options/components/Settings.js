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
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChangeTimeLog = this.handleChangeTimeLog.bind(this);


    this.renderModes = this.renderModes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);


  }

  // onLoad =() => {
  //   chrome.storage.sync.get({ websites: '' }, (items) => this.setState({ websites: items.websites }));
  // };


  handleTextChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChangeTimeLog= (event, index, value) => {
    console.log("time log event, key, payload:", event.target, index, value);
    this.setState(
      {
        foodLogTime: this.state.foodLogTime.push(value)
      });
    console.log('foodlogtime', this.state.foodLogTime)
  };








  renderModes = (name, label, toggleFunc, defaultToggle) => {
    return (<Toggle name={name} label={label}
                   labelPosition="right"
                   onToggle={toggleFunc}
                   defaultToggled={defaultToggle} />)
  };

  renderTimeSelect = (id, label) => {
    return (<SelectField id={id}

                         floatingLabelText={label}
                         onChange={this.handleChangeTimeLog}
                         maxHeight ={200}>
              <MenuItem value={0} primaryText="12:00 am" />
              <MenuItem value={1} primaryText="1:00 am"/>
              <MenuItem value={2} primaryText="2:00 am"/>
              <MenuItem value={3} primaryText="3:00 am"/>
              <MenuItem value={4} primaryText="4:00 am"/>
              <MenuItem value={5} primaryText="5:00 am"/>
              <MenuItem value={6} primaryText="6:00 am"/>
              <MenuItem value={7} primaryText="7:00 am"/>
              <MenuItem value={8} primaryText="8:00 am"/>
              <MenuItem value={9} primaryText="9:00 am"/>
              <MenuItem value={10} primaryText="10:00 am" />
              <MenuItem value={11} primaryText="11:00 am" />
              <MenuItem value={12} primaryText="12:00 pm" />
              <MenuItem value={13} primaryText="1:00 pm"/>
              <MenuItem value={14} primaryText="2:00 pm"/>
              <MenuItem value={15} primaryText="3:00 pm"/>
              <MenuItem value={16} primaryText="4:00 pm"/>
              <MenuItem value={17} primaryText="5:00 pm"/>
              <MenuItem value={18} primaryText="6:00 pm"/>
              <MenuItem value={19} primaryText="7:00 pm"/>
              <MenuItem value={20} primaryText="8:00 pm"/>
              <MenuItem value={21} primaryText="9:00 pm"/>
              <MenuItem value={22} primaryText="10:00 pm" />
              <MenuItem value={23} primaryText="11:00 pm" />
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
        <Col lg={6} md={6} sm={12} xs={12} className="setting_div" onSubmit={this.props.handleModesSubmit}>
              <legend><label>Modes: </label></legend>
                    <DisabledTime renderModes={this.renderModes} renderTimeSelect={this.renderTimeSelect}/>
                    <HourlyMode renderModes={this.renderModes}/>
                    <div>
                    {this.renderModes('dailySteps', ' Daily Steps')}
                    {this.state.dailySteps ? (
                              <div>
                              <TextField id="dailyStepsNum" defaultValue={this.props.stepGoal}/>
                              {this.renderTimeSelect('dailyGoalTime', 'By')}
                              </div>) : null}
                    </div>
                    <div>
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
                    </div>
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
