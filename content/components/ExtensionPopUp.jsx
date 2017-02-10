import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';


const ExtensionPopUp = (props) => {

  return (
    <div id="block-popup" className={"block-cursor block-select block-popup" + (!props.showPopup ? 'block-popup-shrink block-disappear' : '')}>
      <Row id="block-popup-title" className="block-cursor block-select block-popup-title">
        Are you sure you don't want to sleep now?
      </Row>
      <Row id="block-popup-message" className="block-cursor block-select block-popup-message">5 extensions left.
      </Row>
      <Row className="button-row">
        <span id="block-popup-confirm-button" className="block-cursor block-select block-popup-confirm-button block-buttons" onClick={props.extend}>Yes
        </span>
        <span id="block-popup-cancel-button" className="block-cursor block-select block-popup-cancel-button block-buttons" onClick={props.extensionToggle}>
          No
        </span>
      </Row>
    </div>
  )

}

export default ExtensionPopUp
