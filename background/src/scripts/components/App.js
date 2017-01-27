import React, {Component} from 'react';
import {connect} from 'react-redux';



class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    // let divstyle={
    //   background: 'url(http://i.imgur.com/lPnxmhA.jpg) no-repeat 50% 50% fixed'
    // }

    return (
      <div id="bg" style={divstyle}>
        PAGE BLOCKED
      </div>
    );
  }
}

export default App;
