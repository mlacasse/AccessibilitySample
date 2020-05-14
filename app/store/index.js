import { createStore, combineReducers, applyMiddleware } from 'redux';

import complexReducer from './complex';
import photoReducer from './photos';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    complexes: complexReducer,
    photos: photoReducer
}), applyMiddleware(thunk));

export default store;