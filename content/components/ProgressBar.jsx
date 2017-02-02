import React, {Component} from 'react';
import {connect} from 'react-redux';

// var ProgressBar = require('react-progressbar')
// var Circle = ProgressBar.Circle;

import { Circle } from 'react-progressbar.js'

const ProgressBar = React.createClass({
  getInitialState() {
    return {
      progress: 0.63,
    };
  },

  render() {
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
      <Circle
          progress={this.state.progress}
          text={'157/250'}
          options={options}
          initialAnimate={true}
          containerStyle={containerStyle}
          containerClassName={'.progressbar'} />
    );
  },
});

export default ProgressBar;
