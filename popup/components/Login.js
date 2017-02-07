import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import {fitbitAuth} from '../../background/auth';
import { loginUser, logoutUser } from '../../background/reducers/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.signout = this.signout.bind(this);
  }

  onClick() {
    const dispatch = this.props.dispatch;
    fitbitAuth().then( accessToken => {
      dispatch(loginUser(accessToken));
      dispatch({type: 'getChartSteps'});
      dispatch({type: 'getSteps'});
    })
  }

  signout() {
    this.props.dispatch(logoutUser())
  }

  render() {
    return (
      <div className="sign-in-div">
        {this.props.accessToken ?
        <Button id="sign-in" onClick={this.signout}>
          Sign out
        </Button> :
        <Button id="sign-in" onClick={this.onClick}>
          Sign in
        </Button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
  };
};

export default connect(mapStateToProps)(Login);
