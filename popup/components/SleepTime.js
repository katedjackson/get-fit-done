import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  Row } from 'react-bootstrap';

const SleepTime = (props) => {

    return (
      <div>
        <Row>
          {props.sleepBlock ?
            <h3>It's time for bed. Get some sleep!</h3> :
            <h3>{'You will need to sleep at ' + props.sleepTime[0]}</h3>
            }
        </Row>
        <Row>
          <div id="block-progress" className="block-progress">
            <img className="sleep" height="180px" width="180px" src="https://i.imgur.com/KXY2b8V.png" />
          </div>
        </Row>
      </div>
   );
}

const mapStateToProps = (state) => {
  return {
    sleepBlock: state.block && state.block.sleepBlock,
    sleepTime: state.settings && state.settings.sleepTime
  };
};

export default connect(mapStateToProps)(SleepTime);
