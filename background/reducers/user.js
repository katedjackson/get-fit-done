import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

/* ------------------    ACTIONS    --------------------- */

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
const ADD_FAILURE = 'ADD_FAILURE';
const GET_DAILY_STEPS = 'GET_DAILY_STEPS';
const GET_WEEKLY_STEPS = 'GET_WEEKLY_STEPS';
const GET_HOURLY_STEPS = 'GET_HOURLY_STEPS'

/* --------------    ACTION CREATORS    ----------------- */

export const loginUser = createAction(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);

export const addNewAchievement = createAction(ADD_ACHIEVEMENT);

export const addFailure = createAction(ADD_FAILURE);

const getDailySteps = createAction(GET_DAILY_STEPS);

const getWeeklySteps = createAction(GET_WEEKLY_STEPS);

const getHourlySteps = createAction(GET_HOURLY_STEPS);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  accessToken: '',
  badges: [],
  failures: [],
  steps: '',
  weeklySteps: [],
  hourlySteps: ''
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
  GET_DAILY_STEPS: (state, { payload }) => {
    console.log('InDailyStepsREDUCER');
    return { steps: payload };
  },
  GET_WEEKLY_STEPS: (state, action) => {
    axios.get(`https://api.fitbit.com/1/user/-/activities/date/today/1w.json`, { headers: {'Authorization': 'Bearer ' + state.user.accessToken}})
    .then(response => {
      return { weeklySteps: response.data[`activities-log-steps`] };
    })
  },
  GET_HOURLY_STEPS: (state, action) => {
    axios.get(`https://api.fitbit.com/1/user/-/activities/date/today/1d/15min/time/9:45/10:45.json`, { headers: {'Authorization': 'Bearer ' + state.user.accessToken}})
    .then(response => {
      console.log(`hourly steps response:`, response.data);
    })
  }
}, initialState);

/* ------------------    THUNKS    --------------------- */

export const getDailyThunk = (accessToken) => {
  return dispatch => {
    console.log(accessToken)
    let d = new Date();
    let date = d.toISOString().slice(0,10);
    return axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, { headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {
      console.log('In getDailyThunk!');
      dispatch(getDailySteps(response.data.summary.steps));
    })
  }
};
