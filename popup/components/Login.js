import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import {fitbitAuth} from '../../background/auth';


class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    fitbitAuth();
  }

  render() {
    return (
      <Button id="sign-in" onClick={this.onClick}>
        Click to log in through Fitbit
      </Button>
    );
  }
}

export default Login;
