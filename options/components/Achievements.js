import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';

class Achievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievementBadges: [
        { id: 0, type: " 7 Day Streak", url: "/images/badges/7DayStreak.png" },
        { id: 1, type: "14 Day Streak", url: "/images/badges/14DayStreak.png" }
      ]
    };
    this.getDate = this.getDate.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.getBadges = this.getBadges.bind(this);
  }

  getBadges() {
    let earnedBadges = [];
    this.props.badges.map(badgeId => {
      earnedBadges.push(this.state.achievementBadges[badgeId]);
    });
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
            label: '',
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
    console.log(badges);
    return (
      <Grid className="container-fluid">
        <Row className="show-grid graph-failures">
          <Col xs={12} sm={12} md={8} lg={8}>
            <h3>{`Steps for the Week of ${this.getDate()}`}</h3>
            <Line
              data={this.getChartData()}
              options={{legend: { display: false }}}
            />
          </Col>
          <Col className="tickers" xs={12} sm={12} md={4} lg={4}>
            <Row>
              <Col className="streak ticker" xs={12} sm={12} md={12} lg={12}>
                <h1>{this.props.streak}</h1>
                <p className="break">Days Without</p>
                <p className="break">Giving Up!</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="show-grid badges">
          <Col xs={12} sm={12} md={12} lg={12}>
            <h3>My Badges</h3>
            {
              badges && badges.map((badge) => {
                return (
                  <Col xs={6} sm={6} md={3} lg={3} className="badge-col" key={badge.id}>
                    <img src={badge.url}></img>
                  </Col>
                );
              })
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {

  return{
    badges: state.user && state.user.badges,
    streak: state.user && state.user.streak,
    weeklySteps: state.user && state.user.weeklySteps,
    steps: state.user && state.user.steps
  };
};


export default connect(mapStateToProps)(Achievements);
