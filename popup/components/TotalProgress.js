import React, { PropTypes } from 'react';
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
          { props.steps   >= props.stepGoal ?
            <h3 className="animated infinite tada">Congrats you've reached your goal!</h3>
            :
            <h3></h3>
          }
        </Row>
        <Row>
          <h3>You need { props.stepGoal - props.steps} more steps to unlock</h3>
        </Row>
        <Row>
          <Circle
            progress={props.steps / props.stepGoal}
            text={`${props.steps}/${props.stepGoal}`}
            options={options}
            initialAnimate={true}
            containerStyle={containerStyle}
            containerClassName={'.progressbar'} />
        </Row>
      </div>
    );
}

TotalProgress.propTypes = {
  steps: PropTypes.number,
  stepGoal: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    steps: state.user && state.user.steps,
    stepGoal: state.settings && state.settings.totalStepGoal
  };
};

export default connect(mapStateToProps)(TotalProgress);

