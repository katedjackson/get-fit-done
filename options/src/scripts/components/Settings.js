import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Toggle, TextField } from 'material-ui';

import TimePickerComponent from './TimePickerComponent'
import TextFieldComponent from './TextFieldComponent'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: [],
      blacklist: true,
      disable: false,
      hourlySteps: false,
      dailySteps: false,
      foodLog: false,
      waterLog: false,
      disabledTimeStart: null,
      disabledTimeEnd: null,
      hourlyStepsNum: '250',
      dailyStepsNum: 0,
      dailyGoalTime: null,
      foodLogTime: [],
      waterLogTime: []
    }
    this.onLoad = this.onLoad.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleChangeTimePickerStart = (event, date) => {
    this.setState({disabledTimeStart: date});
  };

  handleChangeTimePickerEnd = (event, date) => {
    this.setState({disabledTimeEnd: date});
  };

  handleTextChange = (event) => {
    console.log(event);
    this.setState({
      hourlyStepsNum: event.target.value,
    });
  };

  render() {
    console.log("settings Component: ",this.props.websites);
    console.log(typeof this.props.websites);
    
    return (
      <div>
        <div onSubmit={this.props.handleWebsiteSubmit}>
          <form>
            <div>
              <fieldset>
                <legend>
                <Toggle name="blacklist"
                      label= {`Websites I want to ${this.state.blacklist ? 'block:' : 'allow:'}`}
                      onToggle={() => this.setState({blacklist: !this.state.blacklist})}
                      toggled = {this.state.blacklist} labelPosition="right"/>
                </legend>
                <div>
              <label>Enter the websites you want to block separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.</label>
              <div>
              {typeof this.props.websites === 'string' &&
                (<textarea
                  type="text"
                  name="websites"
                  defaultValue={this.props.websites}
                  />)
              }
              </div>
            </div>
          </fieldset>
          <button type="submit">Save</button>
        </form>
      </div>
      </div>
        <div className="mode_switch">
        <h2>Modes:</h2>
          <div>
            <Toggle name="disable" label="Disable:"
                    onToggle={() => this.setState({disable: !this.state.disable})}
                    toggled = {this.state.disable} />
            {this.state.disable ? (
                    <div>
                    <TimePickerComponent value24={this.state.disabledTimeStart} onChnage={this.handleChangeTimePickerStart}/>
                    ~
                    <TimePickerComponent value24={this.state.disabledTimeEnd}onChnage={this.handleChangeTimePickerEnd}/>
                    </div>) : null}
          </div>
          <div>
            <Toggle name="hourlySteps" label="Hourly Steps:"
                    onToggle={() => this.setState({hourlySteps: !this.state.hourlySteps})}
                    toggled = {this.state.hourlySteps} />
            {this.state.hourlySteps ? (
                    <div>
                    <TextField id="hourlyStepText" value={this.state.hourlyStepsNum} onChange={this.handleTextChange}/>
                    </div>) : null}
            <p> {this.state.hourlyStepsNum} steps per hour </p>
          </div>
          <div>
          <Toggle name="dailySteps" label="Daily Steps:"
                  onToggle={() => this.setState({dailySteps: !this.state.dailySteps})}
                  toggled = {this.state.dailySteps} />
          {this.state.dailySteps ? (
                    <div>
                    <TextField id="dailyStepText" value={this.state.dailyStepsNum} onChange={this.handleTextChange}/>
                    </div>) : null}
            <p> {this.state.dailyStepsNum} steps per hour </p>
            by
            {this.state.dailySteps ? (
                    <div>
                    <TimePickerComponent value24={this.state.dailyGoalTime}/>
                    </div>) : null}
          </div>
          <div>
            <Toggle name="foodLog" label="Food Log:"
                    onToggle={() => this.setState({foodLog: !this.state.foodLog})}
                    toggled = {this.state.foodLog} />
          </div>
          <div>
            <Toggle name="waterLog" label="Water Log:"
                    onToggle={() => this.setState({waterLog: !this.state.waterLog})}
                    toggled = {this.state.waterLog} />
          </div>
        </div>
    </div>

    );
  }
}

Settings.propTypes = {
  handleWebsiteSubmit: PropTypes.func
}

export default Settings;
