import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';


const Login = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {

    return (
      <Button>
        Click to log in through Fitbit
      </Button>
    );
  },
});

export default Login;
