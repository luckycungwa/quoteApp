const bookmarkReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      if (!state.some(item => item.quote === action.payload.quote && item.author === action.payload.author)) {
        return [...state, action.payload];
      }
      return state;

    case 'REMOVE_BOOKMARK':
      return state.filter(item => !(item.quote === action.payload.quote && item.author === action.payload.author));

    default:
      return state;
  }
};

export default bookmarkReducer;
