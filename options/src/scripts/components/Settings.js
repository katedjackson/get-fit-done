import React, {Component} from 'react';

class Settings extends Component {
  constructor(props) {
    super(props);

  }

  // onLoad() {
  //   chrome.storage.sync.get({ websites: '' }, (items) => this.setState({ websites: items.websites }));
  // }

  render() {
    console.log("settings Component: ",this.props.websites);
    return (
      <div onSubmit={this.props.handleWebsiteSubmit}>
        <form >
          <fieldset>
            <legend>Websites I want to block</legend>
            <div>
              <label>Enter the websites you want to block separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.</label>
              <div>
                <textarea
                  type="text"
                  name="websites"
                  defaultValue={this.props.websites}
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

export default Settings;
