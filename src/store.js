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
          localStorage.clear("token");
          localStorage.clear("expiration");
          myRoutes.replace("/");
        })
        .catch(() => {
          console.log("error in loggins out");
        });
    },
    tryAutoLogin({ commit }) {
      let token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      let expirationDate = new Date(localStorage.getItem("expiration"));
      let now = new Date();
      if (now >= expirationDate) {
        return;
      }

      axios
        .get("/contacts/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((theResponse) => {
          commit("storeUserInApp", theResponse.data);
          commit("storeTokenInApp", token);
          this.dispatch("setLogoutTimer");
        })
        .catch(() => {
          myRoutes.replace("/");
        });
    },
    setLogoutTimer({ dispatch }) {
      let expirationDate = new Date(localStorage.getItem("expiration"));
      let now = new Date();
      let timeLeft = expirationDate - now;
      setTimeout(() => {
        dispatch("logout");
      }, timeLeft);
    },
  },
});
