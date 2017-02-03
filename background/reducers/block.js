import {createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  showBlock: false
}

export const SET_BLOCK = 'SET_BLOCK';
export const setBlock = createAction(SET_BLOCK);

export const UNBLOCK = 'UNBLOCK';
export const unblock = createAction(UNBLOCK);

export default handleActions({
  SET_BLOCK: (state, { payload }) => {
    return {...state, showBlock: true};
  },
  UNBLOCK: (state, { payload }) => {
    return initialState;
  }
}, initialState);
