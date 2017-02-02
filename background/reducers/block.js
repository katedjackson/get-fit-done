import {createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  showBlock: true
}

export const SET_BLOCK = 'SET_BLOCK';
export const setBlock = createAction(SET_BLOCK);

export const UNBLOCK = 'UNBLOCK';
export const unblock = createAction(UNBLOCK);

export default handleActions({
  SET_BLOCK: (state, { payload }) => {
    return {showBlock: payload};
  },
  UNBLOCK: (state, { payload }) => {
    return initialState;
  }
}, initialState);
