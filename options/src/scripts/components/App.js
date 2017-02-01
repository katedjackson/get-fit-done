import React, {Component} from 'react';
import Settings from './Settings';
import Achievements from './Achievements';
import Tabs from './Tabs';
import Pane from './Pane';
import { connect } from 'react-redux';

import { setCount, setWebsites, updateWebsites } from '../../../../background/reducers/settings'

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
    console.log(this.props)
    //this.props.dispatch(setCount(500));
    this.props.dispatch(setWebsites(websites));
    updateWebsites(websites);
  }

  componentWillReceiveProps () {
    console.log("IN the component will receive ", this.props)
  }

  render() {
    return (
      <div>
        <Tabs selected={0}>
          <Pane label="Settings">
            <Settings handleWebsiteSubmit={this.handleWebsiteSubmit} websites={this.props.websites}/>
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

//const mapDispatch = { updateWebsites }

// const mapDispatchToProps = (dispatch) => {
//   return{
//       updateWebsites (websites) {
//         dispatch(updateWebsites(websites))
//       }
//     }
//   );
// };

export default connect(mapStateToProps)(App);






