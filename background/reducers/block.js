
/* ------------------    ACTIONS    --------------------- */

const SET_BLOCK    = 'SET_BLOCK';
const REMOVE_BLOCK = 'REMOVE_BLOCK';
const SET_TIMER = 'SET_TIMER';

//
/* --------------    ACTION CREATORS    ----------------- */

const SET_BLOCK     = user => ({ type: SET_BLOCK, user });
const REMOVE_BLOCK  = () => ({ type: REMOVE_BLOCK });
const SET_TIMER = time => ({ type: SET_TIMER, time})

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case SET_BLOCK:
      return action.user;

    case REMOVE_BLOCK:
      return null;

    case SET_TIMER:
      return action.time;

    default:
      return currentUser;
  }
}
