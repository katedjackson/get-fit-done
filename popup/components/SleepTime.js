import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  Row } from 'react-bootstrap';

const SleepTime = (props) => {

    return (
      <div>
        <Row>
            <h3>It's time for bed. Get some sleep!</h3>
        </Row>
        <Row>
          <div id="block-progress" className="block-progress">
            <img className="sleep" height="200px" width="200px" src="https://i.imgur.com/KXY2b8V.png" />
          </div>
        </Row>
      </div>
   );
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(SleepTime);
