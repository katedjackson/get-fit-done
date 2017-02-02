import {combineReducers} from 'redux';
import { outerReducer } from 'redux-async-initial-state';

import websites from './settings';


export default outerReducer(combineReducers({
  websites
}));
