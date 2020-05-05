import { createStore, combineReducers, applyMiddleware } from 'redux';

import photoReducer from './photos';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    photos: photoReducer
}), applyMiddleware(thunk));

export default store;