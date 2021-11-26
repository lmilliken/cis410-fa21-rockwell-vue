<template>
  <div>
    <h1>Movies</h1>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Pitch Text</th>
          <th>Genre</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aMovie in theMovies" :key="aMovie.MoviePK">
          <th>{{ aMovie.Title }}</th>
          <th>{{ aMovie.PitchText }}</th>
          <th>{{ aMovie.GenreName }}</th>
          <th>
            <router-link :to="`/movies/${aMovie.MoviePK}`"
              ><button class="btn btn-primary">Details</button></router-link
            >
          </th>
        </tr>
      </tbody>

      <tbody></tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    theMovies() {
      return this.$store.state.movies;
    },
  },
};
</script>

<style></style>
