import {combineReducers} from 'redux';
import { outerReducer } from 'redux-async-initial-state';

import settings from './settings';


export default outerReducer(combineReducers({
  settings
}));
