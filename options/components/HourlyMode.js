import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import { toggleHourlyMode, setStepGoal } from '../../background/reducers/settings'
import { toggleHourlyBlock } from '../../background/reducers/block'


class HourlyMode extends Component {
  constructor(props){
    super(props);
    this.toggleHourlyMode = this.toggleHourlyMode.bind(this);
    this.stepGoalChange = this.stepGoalChange.bind(this);
  }


  toggleHourlyMode = () => {
    this.props.dispatch(toggleHourlyMode())
    if (this.props.hourlyBlock){
      this.props.dispatch(toggleHourlyBlock());
    }
  };

  stepGoalChange = (evt, value) => {
    this.props.dispatch(setStepGoal(value))
  }

  render(){
    return(
       <div>
         {this.props.renderModes('hourlySteps', ' Hourly Step Goal', this.toggleHourlyMode, this.props.hourlyMode)}
         {this.props.hourlyMode ? (
         <div>
           <TextField id="hourlyStepsNum"
                      className="hourlyStepsField"
                      floatingLabelText="Steps"
                      defaultValue={this.props.stepGoal}
                      onChange={this.stepGoalChange}
           />
         </div>) : null}
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.settings && state.settings.websites,
    blacklist: state.settings && state.settings.blacklist,
    hourlyMode: state.settings && state.settings.hourlyMode,
    stepGoal: state.settings && state.settings.stepGoal,
    hourlyBlock: state.block && state.block.hourlyBlock
  };
};

export default connect(mapStateToProps)(HourlyMode);
