import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class TimePickerComponent extends React.Component {

  render() {
    return (
      <div>
        <TimePicker
          format="24hr"
          hintText="24hr Format"
          value={this.props.value24}
        />
      </div>
    );
  }
}
