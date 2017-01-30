import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';

//is there a reason why you’re using mixed ES5/ES6 syntax
const Login = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {

    return (
      <Button id="sign-in">
        Click to log in through Fitbit
      </Button>
    );
  },
});

export default Login;
