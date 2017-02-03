import { createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  websites: '',
  blacklist: true, //if false, then whitelist
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

export const TOGGLE_BLACKLIST = 'TOGGLE_BLACKLIST';

/*-------------------------ACTION CREATORS----------------------------*/
export const setWebsites = createAction(SET_WEBSITES);

export const setStepGoal = createAction(SET_STEP_GOAL);

export const toggleBlacklist = createAction(TOGGLE_BLACKLIST);

/*-------------------------REDUCERS----------------------------*/
export default handleActions({
	SET_WEBSITES: (state, { payload }) => {
		return {...state, websites: payload};
	},
  SET_STEP_GOAL: (state, { payload }) => {
    return {...state, stepGoal: payload};
  },
  TOGGLE_BLACKLIST: (state, { payload }) => {
    return {...state, blacklist: !state.blacklist}
  }
}, initialState);
