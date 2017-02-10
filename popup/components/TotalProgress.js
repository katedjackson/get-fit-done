import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  Row } from 'react-bootstrap';
import { Circle } from 'react-progressbar.js'

const TotalProgress = (props) => {

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
      <div>
        <Row>
          { (props.steps - props.lastSteps)  >= props.stepGoal ?
            <h3 className='animated infinite tada'>Congrats you've reached your goal!</h3>
            :
            <h3></h3>
          }
        </Row>
        <Row>
          <h3>You need { props.stepGoal - (props.steps - props.lastSteps)} more steps to unlock</h3>
        </Row>
        <Row>
          <Circle
            progress={props.steps/props.stepGoal}
            text={`${props.steps}/${props.stepGoal}`}
            options={options}
            initialAnimate={true}
            containerStyle={containerStyle}
            containerClassName={'.progressbar'} />
        </Row>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    stepGoal: state.settings && state.settings.totalStepGoal
  };
};

export default connect(mapStateToProps)(TotalProgress);

