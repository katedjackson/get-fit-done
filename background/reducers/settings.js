
/* ------------------    ACTIONS    --------------------- */

const BLOCKED_WEBSITES    = 'BLOCKED_WEBSITES';
const NUM_Of_STEPS    = 'NUM_Of_STEPS';

//
/* --------------    ACTION CREATORS    ----------------- */

const BLOCKED_WEBSITES     = websites => ({ type: BLOCKED_WEBSITES, websites });
const NUM_OF_STEPS  = steps => ({ type: NUM_OF_STEPS, steps });

/* ------------------    REDUCER    --------------------- */

export default function reducer (currentUser = null, action) {
  switch (action.type) {

    case BLOCKED_WEBSITES:
      return action.websites;

    case NUM_OF_STEPS:
      return action.steps;

    default:
      return currentUser;
  }
}
