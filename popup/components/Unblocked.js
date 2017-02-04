import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import Login from './Login';

const Unblocked = (props) => {


  return (
    <div>
      Remaining time ....
      <Login />
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log('state: ', state);
  return {
  };
};

export default connect(mapStateToProps)(Unblocked);

