const countryReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NATION":
      const newState = [...state, action.payload];
      return newState;
    case "REMOVE_NATION":
      return state.filter((n) => n !== action.payload);
    default:
      return state;
  }
};
export default countryReducer;
