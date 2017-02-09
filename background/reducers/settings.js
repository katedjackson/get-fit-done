import { createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  websites: '',
  blacklist: false, //if false, then whitelist
  disabledTimeMode: false,
  disabledTime: ['09:00', '17:00'],
  hourlyMode: true,
  timeStepsMode: false,
  stepGoal: "250",
  totalStepGoal: "10000",
  totalStepsTime: '18:00',
  // timeExerciseMode: false,
  // exerciseTime: '18:00',
  // exerciseMinutes: 30,
  // foodMode: false,
  // foodTime: [],
  // waterMode: false,
  // waterTime: [],
  sleepMode: false,
  sleepTime: ['22:00', '06:00']
}
/*-------------------------ACTIONS----------------------------*/
export const SET_WEBSITES = 'SET_WEBSITES';

export const SET_STEP_GOAL = 'SET_STEP_GOAL';

export const SET_TOTAL_STEP_GOAL = 'SET_TOTAL_STEP_GOAL';

export const SET_TOTAL_STEPS_TIME = 'SET_TOTAL_STEPS_TIME';

export const SET_BLACKLIST = 'SET_BLACKLIST';

export const SET_WHITELIST = 'SET_WHITELIST';

export const SET_DISABLED_TIME = 'SET_DISABLED_TIME';

export const SET_SLEEP_TIME = 'SET_SLEEP_TIME';

export const TOGGLE_DISABLE_TIME_MODE = 'TOGGLE_DISABLE_TIME_MODE';

export const TOGGLE_HOURLY_MODE = 'TOGGLE_HOURLY_MODE';

export const TOGGLE_TIME_STEPS_MODE = 'TOGGLE_TIME_STEPS_MODE';

export const TOGGLE_TIME_EXERCISE_MODE = 'TOGGLE_TIME_EXERCISE_MODE';

// export const TOGGLE_FOOD_MODE = 'TOGGLE_FOOD_MODE';

// export const TOGGLE_WATER_MODE = 'TOGGLE_WATER_MODE';

export const TOGGLE_SLEEP_MODE = 'TOGGLE_SLEEP_MODE';

export const SET_START_DISABLE = 'SET_START_DISABLE';

export const SET_STOP_DISABLE = 'SET_STOP_DISABLE';

export const RESET_SETTINGS = 'RESET_SETTINGS'




/*-------------------------ACTION CREATORS----------------------------*/
export const setWebsites = createAction(SET_WEBSITES);

export const setStepGoal = createAction(SET_STEP_GOAL);

export const setTotalStepsTime = createAction(SET_TOTAL_STEPS_TIME);

export const setTotalStepGoal = createAction(SET_TOTAL_STEP_GOAL);

export const setBlacklist = createAction(SET_BLACKLIST);

export const setWhitelist = createAction(SET_WHITELIST);

export const setDisabledTime = createAction(SET_DISABLED_TIME);

export const setSleepTime = createAction(SET_SLEEP_TIME);

export const toggleDisableTimeMode = createAction(TOGGLE_DISABLE_TIME_MODE);

export const toggleHourlyMode = createAction(TOGGLE_HOURLY_MODE);

export const toggleTimeStepsMode = createAction(TOGGLE_TIME_STEPS_MODE);

export const toggleTimeExerciseMode = createAction(TOGGLE_TIME_EXERCISE_MODE);

// export const toggleFoodMode = createAction(TOGGLE_FOOD_MODE);

// export const toggleWaterMode = createAction(TOGGLE_WATER_MODE);

export const toggleSleepMode = createAction(TOGGLE_SLEEP_MODE);

export const setStartDisable = createAction(SET_START_DISABLE)

export const setStopDisable = createAction(SET_STOP_DISABLE)

export const resetSettings = createAction(RESET_SETTINGS)

/*-------------------------REDUCERS----------------------------*/
export default handleActions({
	SET_WEBSITES: (state, { payload }) => {
		return {...state, websites: payload};
	},
  SET_STEP_GOAL: (state, { payload }) => {
    return {...state, stepGoal: payload};
  },
  SET_TOTAL_STEPS_TIME: (state, { payload }) => {
    return {...state, totalStepsTime: payload};
  },
  SET_TOTAL_STEP_GOAL: (state, { payload }) => {
    return {...state, totalStepGoal: payload};
  },
  SET_BLACKLIST: (state, { payload }) => {
    return {...state, blacklist: true}
  },
  SET_WHITELIST: (state, { payload }) => {
    return {...state, blacklist: false}
  },
  SET_DISABLED_TIME: (state, { payload }) => {
    return {...state, disabledTime: payload}
  },
  SET_SLEEP_TIME: (state, { payload }) => {
    return {...state, sleepTime: payload}
  },
  TOGGLE_DISABLE_TIME_MODE: (state, { payload }) => {
    return {...state, disabledTimeMode: !state.disabledTimeMode}
  },
  TOGGLE_HOURLY_MODE: (state, { payload }) => {
    return {...state, hourlyMode: !state.hourlyMode}
  },
  TOGGLE_TIME_STEPS_MODE: (state, { payload }) => {
    return {...state, timeStepsMode: !state.timeStepsMode}
  },
  TOGGLE_TIME_EXERCISE_MODE: (state, { payload }) => {
    return {...state, timeExerciseMode: !state.timeExerciseMode}
  },
  // TOGGLE_FOOD_MODE: (state, { payload }) => {
  //   return {...state, foodMode: !state.foodMode}
  // },
  // TOGGLE_WATER_MODE: (state, { payload }) => {
  //   return {...state, waterMode: !state.waterMode}
  // },
  TOGGLE_SLEEP_MODE: (state, { payload }) => {
    return {...state, sleepMode: !state.sleepMode}
  },
  SET_START_DISABLE: (state, { payload }) => {
    return {...state, startDisableTime: payload};
  },
  SET_STOP_DISABLE: (state, { payload }) => {
    return {...state, stopDisableTime: payload}
  },
  RESET_SETTINGS: (state, { payload }) => {
    return initialState;
  }

}, initialState);
