import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

/* ------------------    ACTIONS    --------------------- */

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
const ADD_FAILURE = 'ADD_FAILURE';
const GET_STEPS = 'GET_STEPS';
const GET_WEEKLY_STEPS = 'GET_WEEKLY_STEPS';

/* --------------    ACTION CREATORS    ----------------- */

export const loginUser = createAction(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);

export const addNewAchievement = createAction(ADD_ACHIEVEMENT);

export const addFailure = createAction(ADD_FAILURE);

export const loginUser = createAction(GET_STEPS);

export const logoutUser = createAction(GET_WEEKLY_STEPS);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  accessToken: '',
  badges: [],
  failures: [],
  steps: '',
  weeklySteps: []
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
  },
  GET_STEPS: (state, action) => {
    let d = new Date();
    let date = d.toISOString().slice(0,10);
    axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, { headers: {'Authorization': 'Bearer ' + state.user.accessToken}})
    .then(response => {
      return { steps: response.data.summary.steps };
    })
  },
  GET_WEEKLY_STEPS: (state, action) => {
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}/1w.json`, { headers: {'Authorization': 'Bearer ' + state.user.accessToken}})
    .then(response => {
      return { weeklySteps: response.data.activities-log-steps };
    })
  }
}, initialState);
