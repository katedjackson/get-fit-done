import { createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

/* ------------------    ACTIONS    --------------------- */

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
const ADD_FAILURE = 'ADD_FAILURE';

/* --------------    ACTION CREATORS    ----------------- */

export const loginUser = createAction(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);

export const addNewAchievement = createAction(ADD_ACHIEVEMENT);

export const addFailure = createAction(ADD_FAILURE);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  accessToken: '',
  badges: [],
  failures: []
};

export default handleActions({
  LOGIN_USER: (state, { payload }) => {
    return { accessToken: payload };
  },
  LOGOUT_USER: (state, action) => {
    return { accessToken: '' };
  },
  ADD_ACHIEVEMENT: (state, { payload }) => {
    return { badges: [...state.badges, payload]};
  },
  ADD_FAILURE: (state, { payload }) => {
    return { failures: [...state.failures, payload]};
  }
}, initialState);
