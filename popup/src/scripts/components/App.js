import React, {Component} from 'react';
import {connect} from 'react-redux';

require('rc-progress/assets/index.css');
import { Line, Circle } from 'rc-progress';


import Blocked from './Blocked';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      percent: 0
    };
  }


  getInitialState() {
     return {
       percent: 0,
     };
   }

   componentDidMount() {
     this.increase();
   } 

   increase() {
     let percent = this.state.percent + 1;
     if (percent > 100) {
       percent = 100;
       clearTimeout(tm);
       return;
     }
     this.setState({ percent });
     var tm = setTimeout(this.increase, 10);
   } 


  render() {
    return (
      <div style={{ margin: 10, width: 200 }}>
        <Circle strokeWidth="6" percent={this.state.percent} />
        
        
      </div>
    );
  }
}

export default App;
