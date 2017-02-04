'use strict';

import {wrapStore, alias } from 'react-chrome-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import chromeStorage, { loadFromStorage } from './redux/chromeStorage';
import { middleware } from 'redux-async-initial-state';
import { getDailyThunk, getWeeklyThunk, getHourlyThunk } from './reducers/user';

import { setBlock, unblock } from './reducers/block';
import { getTimeLeft, resetTime, decrementTime } from './reducers/time'
import { resetLastSteps } from './reducers/user'

const keysToPersistInChrome = ['settings', 'user'];

// load values for keys to persist from storage into redux store
// perform any initial server requests that are independent
// from login state
const loadStore = (currentState) => {
  const chromeStoragePromise = loadFromStorage(keysToPersistInChrome);
  //console.log('current state: ', currentState)
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

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger(),
    chromeStorage(keysToPersistInChrome),
    alias({
      'getSteps': getDailyThunk,
      'getChartSteps': getWeeklyThunk,
      'getTimeoutSteps': getHourlyThunk
    }),
    thunk,
    middleware(loadStore)
  )
);
// a normal Redux store

window.store = store;
wrapStore(store, { portName: 'GET_FIT_DONE' });

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg === 'get-tabId') {
        sendResponse(sender.tab.url);
    }
});



//keeping track of time
var pollInterval = 1000 * 60; // 1 minute, in milliseconds

function startRequest() {
  store.dispatch({type: 'getSteps'});
  var state = store.getState();
  var steps = state.user.steps;
  var lastSteps = state.user.lastSteps;
  var hrSteps = steps-lastSteps
  var blockState = state.block.showBlock;
  var stepGoal = state.settings.stepGoal;
  var timeLeft = state.time.timeLeft;
  console.log ('step')

  if(blockState && hrSteps > stepGoal){
    store.dispatch(unblock());
    store.dispatch(resetTime());
    store.dispatch(resetLastSteps());
  }
  else if (!blockState){
    if(hrSteps < stepGoal && timeLeft === 0) {
      store.dispatch(setBlock());
    }
    else if(hrSteps < stepGoal && timeLeft <= 10) {
      chrome.browserAction.setBadgeBackgroundColor({ color: 'red'});
      store.dispatch(decrementTime())
    }
    else if(hrSteps >= stepGoal && timeLeft === 0) {
      store.dispatch(resetTime())
    }else{
      console.log('DECREMENT')
      store.dispatch(decrementTime())
    }
  }

  //updateBadge();
  // console.log("TEST!")
  // console.log("state, ", store.getState())

  window.setTimeout(startRequest, pollInterval);
}


// function stopRequest() {
//   window.clearTimeout(timerId);
// }

startRequest();






