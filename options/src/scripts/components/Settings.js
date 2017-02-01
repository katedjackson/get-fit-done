import React, { Component, PropTypes } from 'react';
import { Toggle, TextField, TimePicker,
         SelectField, MenuItem, RaisedButton } from 'material-ui';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { Col, Row } from 'react-bootstrap';

injectTapEventPlugin();

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      websites: [],
      blacklist: false,
      disable: false,
      hourlySteps: false,
      dailySteps: false,
      foodLog: false,
      waterLog: false,

      hourlyStepsNum: '250',
      dailyStepsNum: 0,

      disabledTime: [], //[start, end]
      dailyGoalTime: null,
      foodLogTime: [],
      waterLogTime: []
    }
    this.onLoad = this.onLoad.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChangeTimeLog = this.handleChangeTimeLog.bind(this);

    this.renderModes = this.renderModes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);

  }

  onLoad =() => {
    chrome.storage.sync.get({ websites: '' }, (items) => this.setState({ websites: items.websites }));
  };

  handleTextChange = (event) => {
    this.setState({
      [`${event.target.id}Num`]: event.target.value,
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

  renderModes = (name, label) => {
    return (<Toggle name={name} label={label}
                   labelPosition="right"
                   onToggle={(event, toggled) => this.setState({[event.target.name]: toggled})} />)
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
    return (
      <div>
        <div  className="setting_div">
          <form onSubmit={this.props.handleWebsiteSubmit}>
            <fieldset>
              <legend>
                {this.renderModes('blacklist', `Websites I want to ${this.state.blacklist ? 'block: ' : 'allow: '}`)}
              </legend>
              <div>
                <label>Enter the websites you want to block/allow separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.
                </label>
                <div>
                  <TextField
                      name="websites"
                      hintText="Put your websites"
                      defaultValue= {this.state.websites.join(',')}
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                    />
                  <RaisedButton label="Save" primary={true} style ={{margin: 12}} type="submit" />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="setting_div">
          <fieldset>
            <legend><label>Modes: </label></legend>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <div>
                    {this.renderModes('disable', ' Disable')}
                    {this.state.disable ? (
                            <div>
                            {this.renderTimeSelect('disabledTime', 'From')}
                            {this.renderTimeSelect('disabledTime', 'To')}
                            </div>) : null}
                  </div>
                  <div>
                    {this.renderModes('hourlySteps', ' Hourly Steps')}
                    {this.state.hourlySteps ? (
                            <div>
                            <TextField id="hourlySteps" value={this.state.hourlyStepsNum} onChange={this.handleTextChange}/>
                            </div>) : null}
                  </div>
                  <div>
                  {this.renderModes('dailySteps', ' Daily Steps')}
                  {this.state.dailySteps ? (
                            <div>
                            <TextField id="dailySteps" value={this.state.dailyStepsNum} onChange={this.handleTextChange}/>
                            {this.renderTimeSelect('dailyGoalTime', 'By')}
                            </div>) : null}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
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
              </Row>
          </fieldset>
        </div>
      </div>

    );
  }
}

Settings.propTypes = {
  handleWebsiteSubmit: PropTypes.func
}

export default Settings;
