import {combineReducers} from 'redux';
import { outerReducer } from 'redux-async-initial-state';

import settings from './settings';
import user from './user';
import fitbit-data from './fitbit-data'


export default outerReducer(combineReducers({
  settings,
  user,
  fitbit-data
}));
