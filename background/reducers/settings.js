import { createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  websites: '',
  blacklist: true, //if false, then whitelist
  disabledTimesMode: true,
  startDisableTime: '',
  stopDisableTime: '',
  hourlyStepsMode: true,
  timeStepsMode: false,
  stepGoal: 250,
  totalStepsTime: '18:00',
  timeExerciseMode: false,
  exerciseTime: '18:00',
  exerciseMinutes: 30,
  timeFoodMode: false,
  foodTime: [],
  timeWaterMode: false,
  waterTime: [],
  timeSleepMode: false,
  sleepTime: ['22:00', '6:00']
}
/*-------------------------ACTIONS----------------------------*/
export const SET_WEBSITES = 'SET_WEBSITES';

export const SET_STEP_GOAL= 'SET_STEP_GOAL';

export const SET_BLACKLIST = 'SET_BLACKLIST';

export const SET_WHITELIST = 'SET_WHITELIST';

/*-------------------------ACTION CREATORS----------------------------*/
export const setWebsites = createAction(SET_WEBSITES);

export const setStepGoal = createAction(SET_STEP_GOAL);

export const setBlacklist = createAction(SET_BLACKLIST);

export const setWhitelist = createAction(SET_WHITELIST);

/*-------------------------REDUCERS----------------------------*/
export default handleActions({
	SET_WEBSITES: (state, { payload }) => {
		return {...state, websites: payload};
	},
  SET_STEP_GOAL: (state, { payload }) => {
    return {...state, stepGoal: payload};
  },
  SET_BLACKLIST: (state, { payload }) => {
    return {...state, blacklist: true}
  },
  SET_WHITELIST: (state, { payload }) => {
    return {...state, blacklist: false}
  }
}, initialState);
