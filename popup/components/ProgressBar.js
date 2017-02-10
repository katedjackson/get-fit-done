import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Circle } from 'react-progressbar.js';
import { Row } from 'react-bootstrap';

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

    let timeLeft;
    if (props.timeLeft > 0) timeLeft = props.timeLeft;
    else timeLeft = 0;

    return (
      <div>
        <Row>
              { (props.steps - props.lastSteps)  >= props.stepGoal ?
                <h3 className="animated infinite tada">Congrats you've reached your goal!</h3>
                :
                <h3></h3>
              }
            </Row>
            <Row>
              {!props.blocked ?
                <h3>{timeLeft} minutes remaining</h3>
                :
                <h3>You need { props.stepGoal - (props.steps - props.lastSteps)} more steps to unlock</h3>
              }
            </Row>
        <Row>
          <Circle
              progress = { ((props.steps - props.lastSteps)  >= props.stepGoal ) ? 1 : (props.steps - props.lastSteps) / props.stepGoal  }
              text={`${(props.steps - props.lastSteps)}/${props.stepGoal}`}
              options={options}
              initialAnimate={true}
              containerStyle={containerStyle}
              containerClassName={'.progressbar'} />
        </Row>
      </div>
    );
}

Blocked.propTypes = {
  accessToken: PropTypes.string,
  steps: PropTypes.number,
  lastSteps: PropTypes.number,
  hourlySteps: PropTypes.number,
  timeLeft: PropTypes.number,
  stepGoal: PropTypes.number,
  blocked: PropTypes.bool
}
const mapStateToProps = (state) => {
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    lastSteps: state.user && state.user.lastSteps,
    hourlySteps: state.user && state.user.hourlySteps,
    timeLeft: state.user && state.time.timeLeft,
    stepGoal: state.settings && state.settings.stepGoal,
    blocked: state.block && state.block.hourlyBlock
  };
};

export default connect(mapStateToProps)(Blocked);

