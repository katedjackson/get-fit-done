import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Circle } from 'react-progressbar.js'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.getProgress = this.getProgress.bind(this);
  }

  getProgress() {
    return (this.props.steps / this.props.stepGoal);
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
  return {};
};

export default connect(mapStateToProps)(ProgressBar);
