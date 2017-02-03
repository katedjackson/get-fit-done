import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import BlockModal from './BlockModal';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      blockedUrl: false
    }
    this.giveUpToggle = this.giveUpToggle.bind(this);
    this.checkWebsites = this.checkWebsites.bind(this);
  }

  giveUpToggle(){
    this.setState({showPopup: this.state.showPopup ? false : true})
  }

  checkWebsites(){
    var tabUrl;
    chrome.runtime.sendMessage('get-tabId', (response) => {
        tabUrl = response;
        var websites = this.props.websites;

        if(websites && websites.length){
        var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});
        urlsArray.forEach( (url) => {
             let regexp = new RegExp(url);
             if(regexp.test(tabUrl)){
               this.setState({ blockedUrl : true });
             }
           })
        }
    });
  }

  componentDidMount(){
    this.checkWebsites();
  }

  render() {
    return (
      <div>
      {this.props.block && this.state.blockedUrl ?
      (<BlockModal />) : (
      <div></div>
      )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state: ', state);
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    stepGoal: state.settings && state.settings.stepGoal,
    websites: state.settings && state.settings.websites,
    block: state.block && state.block.showBlock
    //hourlySteps: state.hourlySteps
  };
};

export default connect(mapStateToProps)(App);
