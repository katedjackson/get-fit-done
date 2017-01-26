import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react';

require('rc-progress/assets/index.css');
import { Line, Circle } from 'rc-progress';

let tm;

const Blocked = React.createClass({
  getInitialState() {
    return {
      percent: 0,
    };
  },
  componentDidMount() {
    this.increase();
  },
  increase() {
    let percent = this.state.percent + 1;
    if (percent > 65) {
      percent = 65;
      clearTimeout(tm);
      return;
    }
    this.setState({ percent });
    tm = setTimeout(this.increase, 10);
  },
  restart() {
    clearTimeout(tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  },
  render() {
    return (
      <div style={{ margin: 10, width: 150 }}>
        <Circle trailWidth="20" strokeWidth="20" percent={this.state.percent} />
        <h3>150 Steps Left</h3>

      </div>
    );
  },
});

export default Blocked;
