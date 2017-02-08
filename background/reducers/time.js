import { createAction, handleActions } from 'redux-actions';


/* ------------------    ACTIONS    --------------------- */

const GET_TIME_LEFT = 'GET_TIME_LEFT';
const RESET_TIME = 'RESET_TIME';
const DECREMENT_TIME = 'DECREMENT_TIME'

/* --------------    ACTION CREATORS    ----------------- */

export const getTimeLeft = createAction(GET_TIME_LEFT);

export const resetTime = createAction(RESET_TIME);

export const decrementTime = createAction(DECREMENT_TIME);

/* ------------------    REDUCER    --------------------- */

const initialState = {
  timeLeft: 1
};

export default handleActions({
  GET_TIME_LEFT: (state, { payload }) => {
    return {...state, timeLeft: payload };
  },
  RESET_TIME: (state, action) => {
    return initialState;
  },
  DECREMENT_TIME: (state, action) => {
    console.log('state.timeLeft: ', state.timeLeft)
    return {...state, timeLeft: --state.timeLeft}
  }
}, initialState);
