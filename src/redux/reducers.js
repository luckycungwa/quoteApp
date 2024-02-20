import { combineReducers } from 'redux';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from './actions';


// Reducer for bookmarkedQuotes
const bookmarkedQuotes = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.payload];
    case REMOVE_BOOKMARK:
      return state.filter((quote) => !(quote.quote === action.payload.quote && quote.author === action.payload.author));
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  bookmarkedQuotes,
});

export default rootReducer;
