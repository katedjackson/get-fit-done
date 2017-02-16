import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

/* ------------------    ACTIONS    --------------------- */

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
const RESET_STREAK = 'RESET_STREAK';
const INCREMENT_STREAK = 'INCREMENT_STREAK';
const GET_DAILY_STEPS = 'GET_DAILY_STEPS';
const GET_WEEKLY_STEPS = 'GET_WEEKLY_STEPS';
const GET_HOURLY_STEPS = 'GET_HOURLY_STEPS';
const RESET_LAST_STEPS = 'RESET_LAST_STEPS';
const INCREMENT_REFRESH = 'INCREMENT_REFRESH';
const RESET_REFRESH = 'RESET_REFRESH';
const SET_WEEKLY_STEPS_DATE = 'SET_WEEKLY_STEPS_DATE';

/* --------------    ACTION CREATORS    ----------------- */

export const loginUser = createAction(LOGIN_USER);

export const logoutUser = createAction(LOGOUT_USER);

export const addNewAchievement = createAction(ADD_ACHIEVEMENT);

export const resetStreak = createAction(RESET_STREAK);

export const incrementStreak = createAction(INCREMENT_STREAK);

export const resetLastSteps = createAction(RESET_LAST_STEPS);

const getDailySteps = createAction(GET_DAILY_STEPS);

const getWeeklySteps = createAction(GET_WEEKLY_STEPS);

export const incrementRefresh = createAction(INCREMENT_REFRESH);

export const resetRefresh = createAction(RESET_REFRESH);

const setWeeklyStepsDate = createAction(SET_WEEKLY_STEPS_DATE);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  accessToken: '',
  badges: [],
  streak: 0,
  streakDate: '',
  steps: 0,
  lastSteps: 0,
  weeklySteps: [],
  weeklyStepsDate: '',
  timesRefreshed: 0
};

export default handleActions({
  LOGIN_USER: (state, { payload }) => {
    return {...state, accessToken: payload };
  },
  LOGOUT_USER: (state) => {
    return initialState;
  },
  ADD_ACHIEVEMENT: (state, { payload }) => {
    return {...state, badges: [...state.badges, payload]};
  },
  RESET_STREAK: (state) => {
    return {...state, streak: 0 };
  },
  INCREMENT_STREAK: (state) => {
    let d = new Date();
    let dateArr = d.toLocaleDateString().split('/');
    let date = `${dateArr[2]}-${`0${dateArr[0]}`.slice(-2)}-${`0${dateArr[1]}`.slice(-2)}`;
    if (date !== state.streakDate) return {...state, streakDate: date, streak: state.streak + 1 }
    else return state;
  },
  GET_DAILY_STEPS: (state, { payload }) => {
    if (state.lastSteps) return {...state, steps: payload };
    else return {...state, lastSteps: payload, steps: payload };
  },
  GET_WEEKLY_STEPS: (state, { payload }) => {
    return {...state, weeklySteps: payload };
  },
  RESET_LAST_STEPS: (state) => {
    return {...state, lastSteps: state.steps };
  },
  INCREMENT_REFRESH: (state) => {
    return {...state, timesRefreshed: state.timesRefreshed+1}
  },
  RESET_REFRESH: (state) => {
    return {...state, timesRefreshed: 0}
  },
  SET_WEEKLY_STEPS_DATE: (state, { payload }) => {
    return {...state, weeklyStepsDate: payload};
  }
}, initialState);

/* ------------------    THUNKS    --------------------- */

export const getDailyThunk = () =>
  (dispatch, getState) => {
    let { accessToken } = getState().user;
    let d = new Date();
    let dateArr = d.toLocaleDateString().split('/');
    let date = `${dateArr[2]}-${`0${dateArr[0]}`.slice(-2)}-${`0${dateArr[1]}`.slice(-2)}`;
    return axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`,
      { headers: {'Authorization': 'Bearer ' + accessToken}})
    .then(response => {
      dispatch(getDailySteps(response.data.summary.steps));
    })
  };

export const getWeeklyThunk = () =>
  (dispatch, getState) => {
    let { accessToken, weeklyStepsDate } = getState().user;
    let d = new Date();
    let dateArr = d.toLocaleDateString().split('/');
    let date = `${dateArr[2]}-${`0${dateArr[0]}`.slice(-2)}-${`0${dateArr[1]}`.slice(-2)}`;
    if (date !== weeklyStepsDate) {
      return axios.get(`https://api.fitbit.com/1/user/-/activities/steps/date/${date}/1w.json`,
        { headers: {'Authorization': 'Bearer ' + accessToken}})
      .then(response => {
        let steps = response.data[`activities-steps`].map(activity => {
          return activity.value;
        });
        dispatch(getWeeklySteps(steps));
        dispatch(setWeeklyStepsDate(date));
      })
    } else return state;
  };
