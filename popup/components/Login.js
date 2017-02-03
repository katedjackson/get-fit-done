import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import {fitbitAuth} from '../../background/auth';
import { loginUser } from '../../background/reducers/user';


class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log(this.props)
    const dispatch = this.props.dispatch;
    fitbitAuth().then( accessToken => {
      dispatch(loginUser(accessToken));
    })
  }

  render() {
    return (
      <Button id="sign-in" onClick={this.onClick}>
        Click to log in through Fitbit
      </Button>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {};
};

export default connect(mapStateToProps)(Login);
