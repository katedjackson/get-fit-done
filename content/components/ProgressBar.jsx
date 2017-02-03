import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Circle } from 'react-progressbar.js'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.getProgress = this.getProgress.bind(this);
    this.getSteps = this.getSteps.bind(this);
  }

  componentDidMount() {
    this.getSteps();
  }

  getProgress() {
    return this.props.steps/this.props.stepGoal;
  }

  getSteps() {
    this.props.dispatch({ type: 'getSteps' });
    this.props.dispatch({ type: 'getTimeoutSteps'});
  }

  render() {
    var options = {
        strokeWidth: 20,
        trailWidth: 20,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        color: '#00B0B9'
    };

    var containerStyle = {
        width: '200px',
        height: '200px'
    };

    return (
      <Circle
          progress={this.getProgress()}
          text={`${this.props.steps}/${this.props.stepGoal}`}
          options={options}
          initialAnimate={true}
          containerStyle={containerStyle}
          containerClassName={'.progressbar'} />
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user.accessToken,
    steps: state.user.steps,
    hourlySteps: state.user.hourlySteps,
    stepGoal: state.settings.stepGoal
  };
};

export default connect(mapStateToProps)(ProgressBar);
