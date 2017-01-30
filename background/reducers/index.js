import { combineReducers } from 'redux';
import currentUser from './auth';
import block from './block';
import settings from './settings';

export default combineReducers({ currentUser, block, settings });
