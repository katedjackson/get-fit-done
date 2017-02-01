import {createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';


/* ------------------    ACTIONS    --------------------- */

// const SET_WEBSITES    = 'SET_WEBSITES';
// const SET_HOURLY_STEPS    = 'SET_HOURLY_STEPS';

//
/* --------------    ACTION CREATORS    ----------------- */

// export const setWebsites     = websites => ({ type: SET_WEBSITES, websites });
// const setHourlySteps  = hourlySteps => ({ type: SET_HOURLY_STEPS, hourlySteps });
// export const setCount  = count => ({ type: 'SET_COUNT', count });

/* ------------------    REDUCER    --------------------- */
const initialState = {
  websites: '',
  // hourlySteps: 100,
  // count: 0
}

export const SET_WEBSITES = 'SET_WEBSITES';
export const setWebsites = createAction(SET_WEBSITES);

export default handleActions({
	SET_WEBSITES: (state, { payload }) => {
		return payload;
	}
}, initialState);

// export function settings (state = initialState, action) {

// 	const newState = Object.assign({}, state)

// 	switch (action.type) {

// 		case SET_WEBSITES:
// 			newState.websites = action.websites;
// 			break;

// 		case SET_HOURLY_STEPS:
// 			newState.hourlySteps = action.hourlySteps;
// 			break;

// 		case 'SET_COUNT':
// 			newState.count = action.count;
// 			break;

// 		default:
// 			console.log("this is the initialState: ", state);
// 			return state;
// 	}
// 	return newState;
// }


// export const updateWebsites = (websites) => {

// 	console.log("HEY!");
// 	chrome.storage.sync.set({
// 	       websites: websites
// 	   }, function() {
// 	   		console.log("in the callback function")
// 	   })
// }

