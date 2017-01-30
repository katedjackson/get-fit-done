import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react';

// var ProgressBar = require('react-progressbar')
// var Circle = ProgressBar.Circle;

import { Circle } from 'react-progressbar.js'

//is there a reason why you’re using mixed ES5/ES6 syntax
const Blocked = React.createClass({
  getInitialState() {
    return {
      progress: 0.5,
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
          text={'150 Steps Left'}
          options={options}
          initialAnimate={true}
          containerStyle={containerStyle}
          containerClassName={'.progressbar'} />
    );
  },
});

export default Blocked;
