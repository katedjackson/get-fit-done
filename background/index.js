'use strict';

import {wrapStore} from 'react-chrome-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import chromeStorage, { loadFromStorage } from './redux/chromeStorage';
import { middleware } from 'redux-async-initial-state';

import { block, time } from './reducers/index.js'

const keysToPersistInChrome = ['settings', 'users' , 'block'];

// load values for keys to persist from storage into redux store
// perform any initial server requests that are independent
// from login state
const loadStore = (currentState) => {
  const chromeStoragePromise = loadFromStorage(keysToPersistInChrome);
  console.log('current state: ', currentState)
  return Promise.all([
    chromeStoragePromise,
  ])
    .then(([
      loadedChromeStorage,
    ]) => ({
      ...currentState,
      ...loadedChromeStorage,
    }));
};

const store = createStore(rootReducer, applyMiddleware(createLogger(), chromeStorage(keysToPersistInChrome), thunk, middleware(loadStore)));
// a normal Redux store

window.store = store;
wrapStore(store, {portName: 'GET_FIT_DONE'});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg === 'get-tabId') {
        sendResponse(sender.tab.url);
    }
});

var steps = 200;

//keeping track of time
var pollInterval = 1000 * 60; // 1 minute, in milliseconds

function startRequest() {
  console.log("time", time);
  var state = store.getState();
  var blockState = state.block.showBlock;
  var stepGoal = state.settings.stepGoal;
  var timeLeft = state.time.timeLeft;
  

  if(blockState && steps > stepGoal){
    store.dispatch(block.unblock());
    store.dispatch(time.resetTime());
  }
  else if (!blockState){
    if(steps < stepGoal && timeLeft === 0) {
      store.dispatch(block.setBlock());
    }
    else if(steps < stepGoal && timeLeft <= 10) {
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red'});
      store.dispatch(time.decrementTime())
    }
    else if(steps >= stepGoal && timeLeft === 0) {
      store.dispatch(time.resetTime())
    }else{
      store.dispatch(time.decrementTime())
    }
  }

  //updateBadge();
  console.log("TEST!")
  console.log("state, ", store.getState())

  window.setTimeout(startRequest, pollInterval);
}


// function stopRequest() {
//   window.clearTimeout(timerId);
// }

startRequest();






