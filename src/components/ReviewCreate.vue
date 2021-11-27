<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card">
          <div class="card-body">
            <h4>Create a Review</h4>
            <form id="review-form" @submit.prevent="submitReview">
              <div class="mb-3">
                <label for="rating-input" class="form-label">Rating</label
                ><input
                  type="number"
                  class="form-control"
                  id="rating-input"
                  required=""
                  min="1"
                  max="10"
                  v-model="rating"
                />
              </div>
              <div class="mb-3">
                <label for="summary-input" class="form-label">Review</label
                ><input
                  type="text"
                  row="3"
                  class="form-control"
                  id="summary-input"
                  required=""
                  v-model="summary"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit Review</button
              ><button
                v-on:click="cancelReview"
                type="clear"
                class="btn btn-outline-danger"
              >
                Cancel
              </button>

              <p v-if="errorMessage" class="form-text text-danger">
                {{ errorMessage }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rating: null,
      summary: "",
      errorMessage: null,
    };
  },
  methods: {
    submitReview() {
      let myReview = {
        rating: this.rating,
        summary: this.summary,
        movieFK: this.$route.params.pk,
      };

      axios
        .post("/reviews", myReview, {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then(() => {
          this.$router.replace("/account");
        })
        .catch(() => {
          this.errorMessage =
            "Unable to create a review, please try again later";
        });
    },
    cancelReview() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
button {
  margin-right: 5px;
}
</style>
