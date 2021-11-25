<template>
  <div>
    <h1>Account</h1>
    <hr />
    <h3>{{ firstName }}'s Reviews</h3>

    <p v-if="accountError" class="text-danger">
      Cannot get your account information, please try again later.
    </p>

    <table v-if="reviewsByUser" class="table">
      <thead>
        <th>Title</th>
        <th>Summary</th>
        <th>Rating</th>
      </thead>
      <tbody>
        <tr v-for="thisReview in reviewsByUser" :key="thisReview.ReviewPK">
          <th>
            <router-link :to="`/movies/${thisReview.MovieFK}`">{{
              thisReview.Title
            }}</router-link>
          </th>
          <th>{{ thisReview.Summary }}</th>
          <th>{{ thisReview.Rating }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviewsByUser: null,
      accountError: false,
    };
  },
  computed: {
    firstName() {
      console.log("here is the store so far", this.$store.state);
      return this.$store.state.user.NameFirst;
    },
  },
  created() {
    axios
      .get("/reviews/me", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((theResponse) => {
        console.log("here is the response", theResponse);
        this.reviewsByUser = theResponse.data;
      })
      .catch(() => {
        this.accountError = true;
      });
  },
};
</script>

<style></style>
