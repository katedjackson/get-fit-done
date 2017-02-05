import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toggle, TextField, TimePicker,
         SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Col, Row } from 'react-bootstrap';

import { setBlacklist, setWhitelist } from '../../background/reducers/settings'

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
    this.toggleBlacklist = this.toggleBlacklist.bind(this);


    this.renderModes = this.renderModes.bind(this);
    this.renderTimeSelect = this.renderTimeSelect.bind(this);
    this.renderBlacklistSelect = this.renderBlacklistSelect.bind(this);

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

  toggleBlacklist = (event, index, value) => {
    if (index === 0) this.props.dispatch(setBlacklist());
    else if (index === 1) this.props.dispatch(setWhitelist());
  }


  renderBlacklistSelect = (id, label) => {
    var val;
    if (this.props.blacklist === true) val = 0;
    else val = 1;
    return (<SelectField
              id={id}
              floatingLabelText={label}
              value={val}
              onChange={this.toggleBlacklist}
              maxHeight={200}>
              <MenuItem value={0} primaryText="Blacklist" />
              <MenuItem value={1} primaryText="Whitelist" />
            </SelectField>)
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
    console.log("settings Component: ",this.props.websites);
    console.log(typeof this.props.websites);

    return (
      <div>
        <Col lg={6} md={6} sm={12} xs={12} className="setting_div" onSubmit={this.props.handleWebsiteSubmit}>
          <form>
            <fieldset>
              <legend>
                <label>Website Blocking: </label>
              </legend>
              <div>
                {this.renderBlacklistSelect('blacklist', 'Block Mode')}
                <label>Enter the websites you want to block/allow separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.
                </label>
                <div>
                  {console.log('didRender with websites:', this.props.websites)}
                  {typeof this.props.websites === 'string' && <TextField
                      name="websites"
                      id="websites"
                      hintText="Put your websites"
                      defaultValue={this.props.websites}
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                    />}
                  <button type="submit">Save</button>

                  {/*<RaisedButton label="Save" type="submit" primary={true} style ={{margin: 12}}/>*/}
                </div>
              </div>
            </fieldset>
          </form>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12} className="setting_div" onSubmit={this.props.handleModesSubmit}>
          <form>
            <fieldset>
              <legend><label>Modes: </label></legend>
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
                              <TextField id="hourlyStepsNum"
                                defaultValue={this.props.stepGoal} />
                              </div>) : null}
                    </div>
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

                <button type="submit">Save</button>
            </fieldset>
          </form>
        </Col>
      </div>

    );
  }
}

Settings.propTypes = {
  handleWebsiteSubmit: PropTypes.func
}


const mapStateToProps = (state) => {
  console.log('state: ', state)
  return{
    websites: state.settings && state.settings.websites,
    stepGoal: state.settings && state.settings.stepGoal,
    blacklist: state.settings && state.settings.blacklist
  };
};


export default connect(mapStateToProps)(Settings);
