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
    const dispatch = this.props.dispatch;
    fitbitAuth().then( accessToken => {
      dispatch(loginUser(accessToken));
    })
  }

  render() {
    return (
      <div className="sign-in-div">
        {this.props.accessToken ?
        <Button id="sign-in">
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
  //console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
  };
};

export default connect(mapStateToProps)(Login);
