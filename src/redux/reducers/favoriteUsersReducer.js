const favoriteUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "REMOVE_FAV_USERS":
      const newState = state.filter((usr) => usr !== action.payload);
      localStorage.setItem("favoritesUsersReducer", JSON.stringify(newState));
      return newState;

    case "GET_FROM_LOCAL_STORAGE":
      return action.payload;

    case "SAVE_FAV_USERS":
      if (!state.includes(action.payload)) {
        const newState = state.concat(action.payload);
        localStorage.setItem("favoritesUsersReducer", JSON.stringify(newState));
        return newState;
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default favoriteUsersReducer;
