import {combineReducers} from 'redux';
import { outerReducer } from 'redux-async-initial-state';

import settings from './settings';
import user from './user';


export default outerReducer(combineReducers({
  settings,
  user
}));
