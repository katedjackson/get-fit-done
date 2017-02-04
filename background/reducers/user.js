import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

/* ------------------    ACTIONS    --------------------- */

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
const ADD_FAILURE = 'ADD_FAILURE';
const GET_DAILY_STEPS = 'GET_DAILY_STEPS';
const GET_WEEKLY_STEPS = 'GET_WEEKLY_STEPS';
const GET_HOURLY_STEPS = 'GET_HOURLY_STEPS';
const RESET_LAST_STEPS = 'RESET_LAST_STEPS';

/* --------------    ACTION CREATORS    ----------------- */

export const loginUser = createAction(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);

export const addNewAchievement = createAction(ADD_ACHIEVEMENT);

export const addFailure = createAction(ADD_FAILURE);

export const resetLastSteps = createAction(RESET_LAST_STEPS);

const getDailySteps = createAction(GET_DAILY_STEPS);

const getWeeklySteps = createAction(GET_WEEKLY_STEPS);

const getHourlySteps = createAction(GET_HOURLY_STEPS);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  accessToken: '',
  badges: [],
  failures: [],
  steps: '',
  lastSteps: '',
  weeklySteps: []
};

export default handleActions({
  LOGIN_USER: (state, { payload }) => {
    return {...state, accessToken: payload };
  },
  LOGOUT_USER: (state, action) => {
    return {...state, accessToken: '' };
  },
  ADD_ACHIEVEMENT: (state, { payload }) => {
    return {...state, badges: [...state.badges, payload]};
  },
  ADD_FAILURE: (state, { payload }) => {
    return {...state, failures: [...state.failures, payload]};
  },
  GET_DAILY_STEPS: (state, { payload }) => {
    if (state.lastSteps) return {...state, steps: payload };
    else return {...state, lastSteps: payload, steps: payload };
  },
  GET_WEEKLY_STEPS: (state, { payload }) => {
    return {...state, weeklySteps: payload };
  },
  GET_HOURLY_STEPS: (state, { payload }) => {
    return {...state, hourlySteps: payload };
  },
  RESET_LAST_STEPS: (state, { payload }) => {
    return {...state, lastSteps: state.steps }
  }
}, initialState);

/* ------------------    THUNKS    --------------------- */

export const getDailyThunk = () =>
  (dispatch, getState) => {
    let { accessToken } = getState().user;
    let d = new Date();
    let date = d.toISOString().slice(0, 10);
    return axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
      { headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {
      dispatch(getDailySteps(response.data.summary.steps));
    })
  };

export const getWeeklyThunk = () =>
  (dispatch, getState) => {
    let { accessToken } = getState().user;
    return axios.get(`https://api.fitbit.com/1/user/-/activities/date/today/1w.json`,
      { headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {
      dispatch(getWeeklySteps(response.data[`activities-log-steps`]));
    })
  };


/**
** intraday actiity data. need permission from fitbit..
export const getHourlyThunk = () =>
  (dispatch, getState) => {
    let { accessToken } = getState().user;
    console.log('gethourly thunk access token', accessToken)
    return axios.get(`https://api.fitbit.com/1/user/-/activities/tracker/steps/date/today/1d/15min/time/10:30/10:45.json`,
      { headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {
      console.log(response.data);
      dispatch(getHourlySteps(response.data));
    })
  };
*/
