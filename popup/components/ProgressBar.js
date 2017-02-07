import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Circle } from 'react-progressbar.js'

const Blocked = (props) => {

  const options = {
      strokeWidth: 20,
      trailWidth: 20,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      color: '#00B0B9'
  };

  const containerStyle = {
      width: '200px',
      height: '200px'
  };

  return (
    <div>
      <Circle
          progress = {(props.steps - props.lastSteps) / props.stepGoal}
          text={`${(props.steps - props.lastSteps)}/${props.stepGoal}`}
          options={options}
          initialAnimate={true}
          containerStyle={containerStyle}
          containerClassName={'.progressbar'} />


    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    hourlySteps: state.user && state.user.hourlySteps,
    stepGoal: state.settings && state.settings.stepGoal
  };
};

export default connect(mapStateToProps)(Blocked);


