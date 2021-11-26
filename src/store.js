import { createStore } from "vuex";
import axios from "axios";
import myRoutes from "./routes.js";

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
    clearAuthData(state) {
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    getMovies({ commit }) {
      axios.get("/movies").then((aResponse) => {
        console.log("response in /movies", aResponse);
        commit("storeMovies", aResponse.data);
      });
    },
    logout({ commit, state }) {
      axios
        .post("/contacts/logout", null, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then(() => {
          commit("clearAuthData");
          myRoutes.replace("/");
        })
        .catch(() => {
          console.log("error in loggins out");
        });
    },
  },
});
