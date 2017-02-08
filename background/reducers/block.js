import {createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  showBlock: false,
  hourlyBlock: false,
  timeStepsBlock: false,
  sleepBlock: false

}

export const SET_BLOCK = 'SET_BLOCK';
export const setBlock = createAction(SET_BLOCK);

export const UNBLOCK = 'UNBLOCK';
export const unblock = createAction(UNBLOCK);

export const TOGGLE_HOURLY_BLOCK = 'TOGGLE_HOURLY_BLOCK';
export const toggleHourlyBlock = createAction(TOGGLE_HOURLY_BLOCK);

export const TOGGLE_TIME_STEPS_BLOCK = 'TOGGLE_TIME_STEPS_BLOCK';
export const toggleTimeStepsBlock = createAction(TOGGLE_TIME_STEPS_BLOCK);

export const TOGGLE_SLEEP_BLOCK = 'TOGGLE_SLEEP_BLOCK';
export const toggleSleepBlock = createAction(TOGGLE_SLEEP_BLOCK);

export const RESET_BLOCK = 'RESET_BLOCK';
export const resetBlock = createAction(RESET_BLOCK);

export default handleActions({
  SET_BLOCK: (state, { payload }) => {
    return {...state, showBlock: true};
  },
  UNBLOCK: (state, { payload }) => {
    return initialState;
  },
  TOGGLE_HOURLY_BLOCK: (state, { payload }) => {
    return {...state, hourlyBlock: !state.hourlyBlock};
  },
  TOGGLE_TIME_STEPS_BLOCK: (state, { payload }) => {
    return {...state, timeStepsBlock: !state.timeStepsBlock};
  },
  TOGGLE_SLEEP_BLOCK: (state, { payload }) => {
    return {...state, sleepBlock: !state.sleepBlock};
  },
  RESET_BLOCK: (state, { payload }) => {
    return initialState;
  }

}, initialState);
