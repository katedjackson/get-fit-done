import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';

let stepData = {
  1: 5,
  2: 8
};

const Achievements = (props) => {
  const today = new Date().toString();
  const headerDate = today.substr(0, today.length-24);

  return (
    <Grid id="acheievements-tab">
      <Col md={6} lg={6}>
        <Row id="step-graph">
          <h3>{`Steps for Week of ${headerDate}`}</h3>
          <Line data={stepData} />
        </Row>
        <Row id="failure-log">
          <h3>FAILURE LOG</h3>
          <div>
            A LIST OF ALL THE TIMES YOU GAVE UP.
          </div>
        </Row>
      </Col>
      <Col md={6} lg={6}>
        <Row id="badges">
          <h2>ACHIEVEMENT BADGES</h2>
          <div>
            BADGES GO HERE. LOTS OF BADGES.
          </div>
        </Row>
      </Col>
    </Grid>
  );
}

export default Achievements;
