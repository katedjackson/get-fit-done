import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toggle, TextField, TimePicker,
         SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';

import { setBlacklist, setWhitelist, toggleDisableTimeMode } from '../../background/reducers/settings'


class DisabledTime extends Component {
  constructor(props){
    super(props);
    this.toggleDisabledTime = this.toggleDisabledTime.bind(this);
  }


  toggleDisabledTime = () => {
    this.props.dispatch(toggleDisableTimeMode())
  }

  render(){
    return(
       <div>
         {this.props.renderModes('disable', ' Disable', this.toggleDisabledTime, this.props.disabledTimeMode)}
         {this.props.disabledTimeMode ? (
         <div>
         {this.props.renderTimeSelect('disabledTime', 'From')}
         {this.props.renderTimeSelect('disabledTime', 'To')}
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
  };
};

export default connect(mapStateToProps)(DisabledTime);
