import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import Tabs from './Tabs';
import Pane from './Pane';
import { connect } from 'react-redux';

import { setCount } from '../../../../background/reducers/settings'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
  }

  handleWebsiteSubmit (evt) {
    const websites = evt.target.websites.value;
    evt.preventDefault();
    // chrome.storage.sync.set({
    //     websites: websites
    // }, function() {
    //   // chrome.runtime.reload();
    // })
    this.props.dispatch(setCount(500));
    console.log(this.props)
  }

  componentWillReceiveProps () {
    console.log("IN the component will receive ", this.props)
  }

  render() {
    return (
      <div>
        <Tabs selected={0}>
          <Pane label="Settings">
            <Settings handleWebsiteSubmit={this.handleWebsiteSubmit}/>
          </Pane>
          <Pane label="Achievements">
            <Achievements />
          </Pane>
        </Tabs>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    count: state.count,
    websites: state.websites,
    hourlySteps: state.hourlySteps
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return{
//       incrementCount (count) {
//         dispatch(setCount(count))
//       }
//     }
//   );
// };

export default connect(mapStateToProps)(App);






