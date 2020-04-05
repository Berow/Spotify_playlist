import { combineReducers } from 'redux';
import user from './user/reducer';
import { Constants } from '../constants/constants';

const appReducer = combineReducers({ user });

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === Constants.USER_LOGGED_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
