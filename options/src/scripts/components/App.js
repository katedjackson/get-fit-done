import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleWebsiteSubmit = this.handleWebsiteSubmit.bind(this);
  }
  


  handleWebsiteSubmit (evt) {
    const websites = evt.target.websites.value;
    debugger;
    chrome.storage.sync.set({
        websites: websites
    }, function() {
      chrome.runtime.reload();
    })
  }


  render() {
    return (
      <div onSubmit={this.handleWebsiteSubmit}>
        <form >
          <fieldset>
            <legend>Websites I want to block</legend>
            <div>
              <label>Enter the websites you want to block separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.</label>
              <div>
                <textarea
                  type="text"
                  name="websites"
                  
                />
              </div>
            </div>
          </fieldset>
          <button type="submit">Save</button>
        </form>
      </div>


    );
  }
}

export default App;
