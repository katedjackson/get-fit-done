/* ------------------    ACTIONS    --------------------- */

const SET_WEBSITES    = 'SET_WEBSITES';
const SET_HOURLY_STEPS    = 'SET_HOURLY_STEPS';

//
/* --------------    ACTION CREATORS    ----------------- */

export const setWebsites     = websites => ({ type: SET_WEBSITES, websites });
const setHourlySteps  = hourlySteps => ({ type: SET_HOURLY_STEPS, hourlySteps });
export const setCount  = count => ({ type: 'SET_COUNT', count });

/* ------------------    REDUCER    --------------------- */
const initialState = {
  websites: '',
  hourlySteps: 100,
  count: 0
}

export function reducer (state = initialState, action) {

	const newState = Object.assign({}, state)

	switch (action.type) {

		case SET_WEBSITES:
			newState.websites = action.websites;
			break;

		case SET_HOURLY_STEPS:
			newState.hourlySteps = action.hourlySteps;
			break;

		case 'SET_COUNT':
			newState.count = action.count;
			break;

		default:
			console.log("this is the initialState: ", state);
			return state;
	}
	return newState;
}


// export const setWebsites = websites => dispatch => {
// 	chrome.storage.sync.set({
// 	       websites: websites
// 	   }, function() {
// 	   		dispatch(receiveWebsites(websites))
// 	   })
// }

// export const setWebsites = websites => {
// 	chrome.storage.sync.set({
// 	       websites: websites
// 	   }, function() {
// 	   		dispatch(receiveWebsites(websites))
// 	   })

// }
