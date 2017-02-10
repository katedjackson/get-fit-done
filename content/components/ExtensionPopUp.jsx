import React, { Component } from 'react'


const ExtensionPopUp = (props) => {

  return (
    <div id="block-popup" className={"block-cursor block-select block-popup" + (!props.showPopup ? 'block-popup-shrink block-disappear' : '')}>
      <div id="block-popup-title" className="block-cursor block-select block-popup-title">
        Are you sure you don't want to sleep now?
      </div>
      <br/>
      <div id="block-popup-confirm-button" className="block-cursor block-select block-popup-confirm-button block-buttons" onClick={props.extend}>Yes
      </div>
      <div id="block-popup-cancel-button" className="block-cursor block-select block-popup-cancel-button block-buttons" onClick={props.extensionToggle}>
        No
      </div>
    </div>
  )

}

export default ExtensionPopUp
