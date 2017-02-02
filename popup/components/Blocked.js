import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { Circle } from 'react-progressbar.js'

class Blocked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0.5
    }
  }

  render() {
    const options = {
        strokeWidth: 20,
        trailWidth: 20,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false
        },
        color: '#00B0B9'
    };

    const containerStyle = {
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
  }
}

export default Blocked;
