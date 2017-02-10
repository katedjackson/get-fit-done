import React, { PropType } from 'react';
import { connect } from 'react-redux';
import {  Row } from 'react-bootstrap';

const SleepTime = (props) => {

    console.log("disable", props);

    const convertTime = (str) => {
      const timeArr = str.split(':');
      var hours = Number(timeArr[0]);
      var minutes = timeArr[1];

      var result = `${((hours > 12) ? hours - 12 : hours)}:`;
      result += minutes;
      result += (hours >= 12) ? " P.M." : " A.M.";
      return result
    }
    const time = convertTime(props.disabledEnd); //chage to am pm

    return (
      <div>
        <Row>
            <h3>Blocking is disabled until {time}</h3>
        </Row>
        <Row>
          <div id="block-progress" className="block-progress">
            <img className="sleep" height="180px" src="../../unlock.png" />
          </div>
        </Row>
      </div>
   );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    disabledEnd: state.settings && state.settings.disabledTime && state.settings.disabledTime[1]
  };
};

export default connect(mapStateToProps)(SleepTime);
