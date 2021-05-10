import { combineReducers } from 'redux';
import { userReducer } from './userReducers'

const reducers = {
  user: userReducer,
}

export default combineReducers(reducers);