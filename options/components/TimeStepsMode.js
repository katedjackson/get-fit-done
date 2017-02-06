
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';


import { toggleTimeStepsMode, setTotalStepGoal, setTotalStepsTime } from '../../background/reducers/settings'


class TimeStepsMode extends Component {
  constructor(props){
    super(props);
    this.toggleTimeStepsMode = this.toggleTimeStepsMode.bind(this);
    this.stepGoalChange = this.stepGoalChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  toggleTimeStepsMode = () => {
    this.props.dispatch(toggleTimeStepsMode())
  };

  stepGoalChange = (evt, value) => {
    this.props.dispatch(setTotalStepGoal(value))
  };

  handleTimeChange = (event, index, value) => {
    this.props.dispatch(setTotalStepsTime(value));
  };

  render(){
    return(
       <div>
         {this.props.renderModes('timeSteps', ' Step vs. Time Blocking', this.toggleTimeStepsMode, this.props.timeStepsMode)}
         {this.props.timeStepsMode ? (
         <div>
           <TextField id="timeStepsNum"
                      defaultValue={this.props.totalStepGoal}
                      onChange={this.stepGoalChange}
           />
           {this.props.renderTimeSelect('dailyGoalTime', 'By', this.handleTimeChange, this.props.totalStepsTime)}
         </div>) : null}
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.settings && state.settings.websites,
    blacklist: state.settings && state.settings.blacklist,
    timeStepsMode: state.settings && state.settings.timeStepsMode,
    totalStepGoal: state.settings && state.settings.totalStepGoal,
    totalStepsTime: state.settings && state.settings.totalStepsTime
  };
};

export default connect(mapStateToProps)(TimeStepsMode);
