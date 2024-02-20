import { createStore, combineReducers } from 'redux';
import bookmarkReducer from './bookmarkReducer';

const rootReducer = combineReducers({
  // other reducers...
  bookmarkedQuotes: bookmarkReducer,
  
});

const store = createStore(rootReducer);

export default store;
