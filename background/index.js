'use strict';

import {wrapStore, alias } from 'react-chrome-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import chromeStorage, { loadFromStorage } from './redux/chromeStorage';
import { middleware } from 'redux-async-initial-state';
import { getDailyThunk, getWeeklyThunk, getHourlyThunk } from './reducers/user';

import { setBlock, unblock, toggleHourlyBlock, toggleTimeStepsBlock, toggleSleepBlock } from './reducers/block';
import { getTimeLeft, resetTime, decrementTime } from './reducers/time'
import { resetLastSteps, incrementStreak, incrementTotalSteps } from './reducers/user'

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
  let t = new Date()
  let time = t.toString().slice(16,21);

  store.dispatch({type: 'getSteps'})
  .then((response) => {
    var state = store.getState();
    if (state.user.steps < state.user.lastSteps) {
      store.dispatch(resetLastSteps());
    }
  })
  .then((response) => {
    store.dispatch(decrementTime());
  })
  .then((response) => {
    var state = store.getState();
    if (state.settings.hourlyMode) checkHourlyBlock(state);
    if (state.settings.timeStepsMode) checkTimeSteps(state,time);
    if (state.settings.sleepMode) checkSleepTime(state, time);
  })
  .then((response) => {
    checkBlockState(store.getState())
  })

  window.setTimeout(startRequest, pollInterval);
}

startRequest();

function checkBlockState(state){
  if (state.block.showBlock){
    if (!state.block.hourlyBlock && !state.block.timeStepsBlock && !state.block.sleepBlock){
      store.dispatch(unblock());
    }
  }
  else if (state.block.hourlyBlock || state.block.timeStepsBlock || state.block.sleepBlock){
    store.dispatch(setBlock());
  }
}

function checkHourlyBlock(state){
  var hrSteps = state.user.steps-state.user.lastSteps;
  var stepGoal = state.settings.stepGoal;
  var blockState = state.block.hourlyBlock;
  var timeLeft = state.time.timeLeft;

  if(blockState && hrSteps > stepGoal){
    store.dispatch(resetTime());
    store.dispatch(resetLastSteps());
    store.dispatch(toggleHourlyBlock());
  }
  else if (!blockState){
    if(hrSteps < stepGoal && timeLeft === 0) {
      store.dispatch(toggleHourlyBlock());
    }
    else if(hrSteps >= stepGoal && timeLeft === 0) {
      store.dispatch(resetTime());
      store.dispatch(resetLastSteps());
    }
  }
}

function checkTimeSteps(state, time){
  let totalSteps = state.user.steps;
  let stepGoal = state.settings.totalStepGoal;
  let blockTime = state.settings.totalStepsTime;
  let blockState = state.block.timeStepsBlock;
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let blockTimeVal = Number(blockTime.slice(0,2) + blockTime.slice(3));

  if (!blockState && currTimeVal >= blockTimeVal && totalSteps < stepGoal){
    store.dispatch(toggleTimeStepsBlock())
  }
  else if (blockState && currTimeVal >= blockTimeVal && totalSteps >= stepGoal){
    store.dispatch(toggleTimeStepsBlock());
  }
  else if (blockState && currTimeVal <= blockTimeVal) {
    store.dispatch(toggleTimeStepsBlock());
  }

}

function checkSleepTime(state, time){
  console.log("CHECKING SLEEP TIME")
  let blockState = state.block.sleepBlock;
  let startSleep = state.settings.sleepTime[0];
  let stopSleep = state.settings.sleepTime[1];
  let currTimeVal = Number(time.slice(0,2) + time.slice(3));
  let startSleepVal = Number(startSleep.slice(0,2) + startSleep.slice(3));
  let stopSleepVal = Number(stopSleep.slice(0,2) + stopSleep.slice(3));

  console.log("blockState: ", blockState)
  console.log("currTimeVal: ", currTimeVal)
  console.log("startSleepVal: ", startSleepVal)
  console.log("stopSleepVal: ", stopSleepVal)


  if (blockState) {
    if (startSleepVal < stopSleepVal){
      if (currTimeVal >= stopSleepVal || currTimeVal < startSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
    else if (startSleepVal > stopSleepVal) {
      if (currTimeVal >= stopSleepVal && currTimeVal < startSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
  }
  else if (!blockState) {
    if (startSleepVal < stopSleepVal) {
      if (currTimeVal >= startSleepVal && currTimeVal < stopSleepVal){
        store.dispatch(toggleSleepBlock());
      }
    }
    else if (startSleepVal > stopSleepVal){
      if (currTimeVal >= startSleepVal || currTimeVal < stopSleepVal)
        store.dispatch(toggleSleepBlock());
    }
  }


}


