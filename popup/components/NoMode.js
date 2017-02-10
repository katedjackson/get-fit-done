import React from 'react';
import { connect } from 'react-redux';
import {  Row } from 'react-bootstrap';

const NoMode = (props) => {
    return (
      <div>
        <Row>
          <h3>You don't have any blocking mode turned on! Please go to 'Options' to configure your block settings</h3>
        </Row>
        <Row>
          <div id="block-progress" className="block-progress">
            <img className="sleep" height="160px" src="../../smile.png" />
          </div>
        </Row>
      </div>
   );
}

export default NoMode;
