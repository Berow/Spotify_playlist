import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk"

import rootReducer from './reducers';

const enhancers = [];
const devToolsExtension = window['__REDUX_DEVTOOLS_EXTENSION__'];
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
}

const store = createStore(rootReducer, compose(applyMiddleware(thunk), ...enhancers));

export default store;
