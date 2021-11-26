import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    token: null,
    user: null,
    movies: [],
  },
  mutations: {
    storeTokenInApp(state, myToken) {
      state.token = myToken;
    },

    storeUserInApp(state, theUser) {
      state.user = theUser;
    },
    storeMovies(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    getMovies({ commit }) {
      axios.get("/movies").then((aResponse) => {
        console.log("response in /movies", aResponse);
        commit("storeMovies", aResponse.data);
      });
    },
  },
});
