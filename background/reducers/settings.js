/* ------------------    ACTIONS    --------------------- */

const SET_WEBSITES    = 'SET_WEBSITES';
const SET_HOURLY_STEPS    = 'SET_HOURLY_STEPS';

//
/* --------------    ACTION CREATORS    ----------------- */

const SET_WEBSITES     = websites => ({ type: SET_WEBSITES, websites });
const SET_HOURLY_STEPS  = steps => ({ type: SET_HOURLY_STEPS, steps });

/* ------------------    REDUCER    --------------------- */
const initialState = {
  websites: [],
  hourlySteps: 100
}

export default function reducer (state = initialState, action) {
 switch (action.type) {

   case SET_WEBSITES:
     return action.websites;

   case SET_HOURLY_STEPS:
     return action.hourlySteps;

   default:
     return state;
 }
}
