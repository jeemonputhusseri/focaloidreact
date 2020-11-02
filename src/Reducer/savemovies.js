export default (state, action) => {
    switch (action.type) {
      case "SAVE_MOVIES":
        return {
          savedmovies: action.payload
        };
      default:
        return state;
    }
  };