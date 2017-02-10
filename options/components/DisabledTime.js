import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toggle, TextField, TimePicker,
         SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';

import { setDisabledTime, toggleDisableTimeMode } from '../../background/reducers/settings'
import { toggleDisable } from '../../background/reducers/block';


class DisabledTime extends Component {
  constructor(props){
    super(props);
    this.toggleDisabledTime = this.toggleDisabledTime.bind(this);
    this.handleStartDisabledTime = this.handleStartDisabledTime.bind(this);
    this.handleEndDisabledTime = this.handleEndDisabledTime.bind(this);
  }


  toggleDisabledTime = () => {
    this.props.dispatch(toggleDisableTimeMode())
    if (this.props.disabled) this.props.dispatch(toggleDisable());
  };

  handleStartDisabledTime = (event, index, value) => {
    this.props.dispatch(setDisabledTime([value, this.props.disabledTime[1]]));
  };

  handleEndDisabledTime = (event, index, value) => {
    this.props.dispatch(setDisabledTime([this.props.disabledTime[0], value]));
  };
  render(){
    return(
       <div>
         {this.props.renderModes('disable', ' Disable', this.toggleDisabledTime, this.props.disabledTimeMode)}
         {this.props.disabledTimeMode ? (
         <div>
         {this.props.renderTimeSelect('startDisabledTime', 'From', this.handleStartDisabledTime, this.props.disabledTime[0])}
         {this.props.renderTimeSelect('endDisabledTime', 'To', this.handleEndDisabledTime, this.props.disabledTime[1])}
         </div>) : null}
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.settings && state.settings.websites,
    blacklist: state.settings && state.settings.blacklist,
    disabledTimeMode: state.settings && state.settings.disabledTimeMode,
    disabledTime: state.settings && state.settings.disabledTime,
    disabled: state.block && state.block.disable
  };
};

export default connect(mapStateToProps)(DisabledTime);
