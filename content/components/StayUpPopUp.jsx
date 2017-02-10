import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';


const StayUpPopUp = (props) => {

  return (
    <div id="block-popup" className={"block-cursor block-select block-popup" + (!props.showPopup ? 'block-popup-shrink block-disappear' : '')}>
      <Row id="block-popup-title" className="block-cursor block-select block-popup-title">
        You want to sleep in a bed of lies?
      </Row>
      <Row id="block-popup-message" className="block-cursor block-select block-popup-message">This will break your {props.streak} day streak.
      </Row>
      <Row className="button-row">
        <span id="block-popup-confirm-button" className="block-cursor block-select block-popup-confirm-button block-buttons" onClick={props.unblock}>Yes
        </span>
        <span id="block-popup-cancel-button" className="block-cursor block-select block-popup-cancel-button block-buttons" onClick={props.giveUpToggle}>
          No
        </span>
      </Row>
    </div>
  )

}

export default StayUpPopUp
