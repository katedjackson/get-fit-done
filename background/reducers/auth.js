

/* ------------------    ACTIONS    --------------------- */

const SET    = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';
const SET_TOKEN = 'SET_USER_TOKEN';

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });
const remove  = () => ({ type: REMOVE });
const setToken = token => ({ type: SET_TOKEN, token})

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case SET:
      return action.user;

    case REMOVE:
      return null;

    case SET_TOKEN:
      return action.token;

    default:
      return currentUser;
  }
}
