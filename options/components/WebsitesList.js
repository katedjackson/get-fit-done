import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toggle, TextField, TimePicker, SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';
import { setBlacklist, setWhitelist, toggleDisableTimeMode } from '../../background/reducers/settings'


class WebsitesList extends Component {
  constructor(props){
    super(props);
    this.renderBlacklistSelect = this.renderBlacklistSelect.bind(this);
    this.toggleBlacklist = this.toggleBlacklist.bind(this)
  }

  toggleBlacklist (event, index, value) {
    if (index === 0) this.props.dispatch(setBlacklist());
    else if (index === 1) this.props.dispatch(setWhitelist());
  }

  renderBlacklistSelect (id, label) {
    var val;
    if (this.props.blacklist === true) val = 0;
    else val = 1;
    return (
      <SelectField
        id={id}
        floatingLabelText={label}
        value={val}
        onChange={this.toggleBlacklist}
        maxHeight={200}>
        <MenuItem value={0} primaryText="Blacklist" />
        <MenuItem value={1} primaryText="Whitelist" />
      </SelectField>);
  }

  render() {
    return(
     <form onSubmit={this.props.handleWebsiteSubmit}>
       <fieldset>
         <legend>
           <label>Website Blocking: </label>
         </legend>
         <div>
           {this.renderBlacklistSelect('blacklist', 'Block Mode')}
           <label>Enter the websites you want to block/allow separated by a comma. Enter <b>only</b> the domain name and extension. For example, enter facebook.com, snapchat.com, instagram.com <b>not</b> https://www.facebook.com/, https://www.snapchat.com/, https://www.instagram.com/.
           </label>
           <div>
             {typeof this.props.websites === 'string' && <TextField
                 name="websites"
                 id="websites"
                 hintText="Put your websites"
                 defaultValue={this.props.websites}
                 multiLine={true}
                 rows={2}
                 rowsMax={4}
               />}
             <button type="submit">Save</button>
             {/*<RaisedButton label="Save" type="submit" primary={true} style ={{margin: 12}}/>*/}
           </div>
         </div>
       </fieldset>
     </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    websites: state.settings && state.settings.websites,
    blacklist: state.settings && state.settings.blacklist
  };
};

export default connect(mapStateToProps)(WebsitesList);
