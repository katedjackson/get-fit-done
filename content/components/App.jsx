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
    this.checkWebsites = this.checkWebsites.bind(this);
  }

  checkWebsites(){
    var tabUrl;
    chrome.runtime.sendMessage('get-tabId', (response) => {
        tabUrl = response;
        var websites = this.props.websites;
        var matchingSite = false
        if(websites && websites.length){
        var urlsArray = websites.split(",").map(function(url){return url.trim() + "/*"});
        urlsArray.forEach( (url) => {
             let regexp = new RegExp(url);
             if(regexp.test(tabUrl)){
               matchingSite = true;
             }
           })
        }
        this.setState({blockedUrl: matchingSite})
    });
  }

  componentDidMount(){
    this.checkWebsites();
  }

  render() {
    let showBlock = false;
    if (this.props.sleepBlock || this.props.timeStepsBlock || this.props.hourlyBlock) showBlock = true;

    return (
      <div>
      {(this.props.blacklist && showBlock && this.state.blockedUrl) ||
       (!this.props.blacklist && showBlock && !this.state.blockedUrl) ?
      (<BlockModal />) : (
      <div></div>
      )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.user && state.user.accessToken,
    steps: state.user && state.user.steps,
    stepGoal: state.settings && state.settings.stepGoal,
    websites: state.settings && state.settings.websites,
    hourlyBlock: state.block && state.block.hourlyBlock,
    timeStepsBlock: state.block && state.block.timeStepsBlock,
    sleepBlock: state.block && state.block.sleepBlock,
    blacklist: state.settings && state.settings.blacklist
  };
};

export default connect(mapStateToProps)(App);
