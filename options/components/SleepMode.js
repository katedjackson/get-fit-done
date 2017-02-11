import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSleepTime, toggleSleepMode } from '../../background/reducers/settings'
import { toggleSleepBlock } from '../../background/reducers/block'


class SleepMode extends Component {
  constructor(props){
    super(props);
    this.toggleSleepMode = this.toggleSleepMode.bind(this);
    this.handleStartSleepTime = this.handleStartSleepTime.bind(this);
    this.handleEndSleepTime = this.handleEndSleepTime.bind(this);
  }


  toggleSleepMode = () => {
    this.props.dispatch(toggleSleepMode())
    if (this.props.sleepBlock){
      this.props.dispatch(toggleSleepBlock())
    }
  };

  handleStartSleepTime = (event, index, value) => {
    this.props.dispatch(setSleepTime([value, this.props.sleepTime[1]]));
  };

  handleEndSleepTime = (event, index, value) => {
    this.props.dispatch(setSleepTime([this.props.sleepTime[0], value]));
  };

  render(){
    return(
       <div>
         {this.props.renderModes('sleep', ' Sleep Mode', this.toggleSleepMode, this.props.sleepMode)}
         {this.props.sleepMode ? (
         <div>
         {this.props.renderTimeSelect('startSleepMode', 'From', this.handleStartSleepTime, this.props.sleepTime[0])}
         {this.props.renderTimeSelect('endSleepMode', 'From', this.handleEndSleepTime, this.props.sleepTime[1])}
         </div>) : null}
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.settings && state.settings.websites,
    blacklist: state.settings && state.settings.blacklist,
    sleepMode: state.settings && state.settings.sleepMode,
    sleepTime: state.settings && state.settings.sleepTime,
    sleepBlock: state.block && state.block.sleepBlock
  };
};

export default connect(mapStateToProps)(SleepMode);
