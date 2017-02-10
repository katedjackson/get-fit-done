import React, {Component} from 'react';

function Pane (props) {
    return (
      <div>
        {props.children}
      </div>
    );
}

export default Pane;
