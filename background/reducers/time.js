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
  timeLeft: 12
};

export default handleActions({
  GET_TIME_LEFT: (state, { payload }) => {
    return { timeLeft: payload };
  },
  RESET_TIME: (state, action) => {
    return { timeLeft: 60 };
  },
  DECREMENT_TIME: (state, action) => {
    if(state.timeLeft > 60) return { timeLeft: state.timeLeft-- };
    return { timeLeft: 0}
  }
}, initialState);
