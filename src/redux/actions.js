// actions.js
export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

// Action creators
export const addBookmark = (quote) => ({
  type: ADD_BOOKMARK,
  payload: quote,
});

export const removeBookmark = (quote) => ({
  type: REMOVE_BOOKMARK,
  payload: quote,
});
