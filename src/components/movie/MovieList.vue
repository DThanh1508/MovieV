
<template>
  <v-table height="80vh">
    <thead>
    <tr>
      <th class="text-left">
        No.
      </th>
      <th class="text-left">
        Plot
      </th>
      <th class="text-left">
        Genres
      </th>
      <th class="text-left">
        Title
      </th>
      <th class="text-left">
        Creation date
      </th>
      <th class="text-center">
        Actions
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        :class="{ active: index == currentIndex }"
        v-for="(movie, index) in movies"
        :key="index"
        @click="setActiveMovie(movie, index)"
    >
      <td>{{ index }}</td>
      <td>{{ movie.plot }}</td>
      <td>{{ getMovieGenres(movie) }}</td>
<!--      <td>{{ movie.genres }}</td>-->
      <td>{{ movie.title }}</td>
      <td>{{ movie.creationDate }}</td>
      <td class="text-center">
        <v-btn color="primary">Edit</v-btn>
        &ensp;
        <v-btn color="error" @click="deleteMovie">Delete</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import MovieDataService from "@/components/services/MovieDataService";

export default {
  name: "MovieList",
  data: () => ({
    counter: 0,
    movies: [],
    currentMovie: null,
    currentIndex: -1,
    title: ""
  }),
  methods:{
    getMovie(id) {
      MovieDataService.get(id)
          .then(response => {
            this.currentMovie = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    //delete movie
    deleteMovie() {
      MovieDataService.delete(this.currentMovie.id)
          .then(response => {
            console.log(response.data);
            // this.$router.push({ name: "movies" });
          })
          .catch(e => {
            console.log(e);
          });
    },
    //get movies
    getMovieGenres(movie) {
      return movie.genres.join(', ');
    },

    retrieveMovies() {
      MovieDataService.getAll()
          .then(response => {
            this.movies = response.data;
            this.counter = ++this.counter;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrieveMovies();
      this.currentMovie = null;
      this.currentIndex = -1;
    },
    setActiveMovie(movie, index) {
      this.currentMovie = movie;
      this.currentIndex = movie ? index : -1;
    },
    removeAllMovies() {
      MovieDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchTitle() {
      MovieDataService.findByTitle(this.title)
          .then(response => {
            this.movies = response.data;
            this.setActiveMovie(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveMovies();
    // this.message = '';
    // this.getMovie(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
