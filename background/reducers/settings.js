import { createAction, handleActions } from 'redux-actions';
import { PropTypes } from 'react';

const initialState = {
  websites: '',
  // hourlySteps: 100,
}

export const SET_WEBSITES = 'SET_WEBSITES';

export const setWebsites = createAction(SET_WEBSITES);

export default handleActions({
	SET_WEBSITES: (state, { payload }) => {
		return {websites: payload};
	}
}, initialState);



