import { createStore } from "redux";
import savedmovies from "../Reducer/savemovies";

function configureStore(state = { savedmovies: [] }) {
  return createStore(savedmovies, state);
}

export default configureStore;