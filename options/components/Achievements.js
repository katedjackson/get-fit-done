import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';

class Achievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievementBadges: [
        { id: 0, type: "50,000 Steps", url: "/options/badges/steps1.png" },
        { id: 1, type: "100,000 Steps", url: "/options/badges/steps2.png" },
        { id: 2, type: " 7 Day Streak", url: "/options/badges/streak1.png" },
        { id: 3, type: "14 Day Streak", url: "/options/badges/streak2.png" }
      ]
    };
    this.getDate = this.getDate.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getLabels = this.getLabels.bind(this);
  }

  getBadges() {
    let earnedBadges = [];
    this.props.badges.map(badgeId => {
      earnedBadges.push(this.state.achievementBadges[badgeId]);
    });
    console.log(earnedBadges);
    return earnedBadges;
  }

  getDate() {
    const today = new Date().toString();
    return today.substr(0, today.length-24);
  }

  getLabels() {
    const days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    const d = new Date();
    const dayIndex = d.getDay();
    const labels = [...days.slice(dayIndex + 1, days.length), ...days.slice(0, dayIndex + 1)];
    return labels;
  }

  getChartData() {
    return (
      {
        labels: this.getLabels(),
        datasets: [
          {
            label: `Steps for the Week of ${this.getDate()}`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.props.weeklySteps
          }
        ]
      }
    );
  }

  render () {
    let badges = this.getBadges();
    return (
      <Grid>
        <Row className="show-grid badges">
            <h2>My Badges</h2>
            {
              badges && badges.map((badge) => {
                return (
                  <Col md={3} lg={3} className="badge-col" key={badge.id}>
                    <img src={badge.url}></img>
                  </Col>
                );
              })
            }
        </Row>
        <Row className="show-grid graph-failures">
          <Col md={6} lg={6}>
            <Line
              data={this.getChartData()}
            />
          </Col>
          <Col md={6} lg={6}>
            <h1>{this.props.streak}</h1>
            days without giving up!
          </Col>
          <Col>
            <h1>{this.props.totalSteps === 0 ? this.props.steps : this.props.totalSteps}</h1>
            Steps!
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state)
  return{
    badges: state.user && state.user.badges,
    streak: state.user && state.user.streak,
    weeklySteps: state.user && state.user.weeklySteps,
    totalSteps: state.user && state.user.totalSteps,
    steps: state.user && state.user.steps
  };
};


export default connect(mapStateToProps)(Achievements);
