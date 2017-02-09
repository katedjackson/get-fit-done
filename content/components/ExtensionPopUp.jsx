import React, { Component } from 'react'


const ExtensionPopUp = (props) => {

  return (
    <div id="block-popup" className={"block-cursor block-select block-popup" + (!props.showPopup ? 'block-popup-shrink block-disappear' : '')}>
      <div id="block-popup-title" className="block-cursor block-select block-popup-title">
        Are you sure you want to sleep on a bed of lies?
      </div>
      <br/>
      <div id="block-popup-message" className="block-cursor block-select block-popup-message">This will break your {props.streak} day streak.
      </div>
      <div id="block-popup-confirm-button" className="block-cursor block-select block-popup-confirm-button block-buttons" onClick={props.extend}>Yes
      </div>
      <div id="block-popup-cancel-button" className="block-cursor block-select block-popup-cancel-button block-buttons" onClick={props.giveUpToggle}>
        No
      </div>
    </div>
  )

}

export default ExtensionPopUp
