import React, { Component } from 'react';
import {connect} from 'react-redux';

class  SplashScreen extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.login();
  }

  render () {
    return (
      <div className="splash-screen">
        <img className="splash-img" src={"/images/logo.png"}/>
        <h2>Stay fit and productive.</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    accessToken: state.user && state.user.accessToken
  };
};

export default connect(mapStateToProps)(SplashScreen);
