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
        Image
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
    <v-text-field
        class="mt-5"
        label="What is here?"
        prepend-inner-icon="mdi-file-find"
        append-inner-icon="mdi-magnify"
        v-model="title"
        @change="filter()"
    ></v-text-field>
    <v-btn @click="searchTitle">Search</v-btn>
    <v-btn @click="removeAllMovies">Remove </v-btn>
    <tbody>
    <tr
        :class="{ active: index == currentIndex }"
        v-for="(movie, index) in filteredMovies"
        :key="index"
        @click="setActiveMovie(movie, index)"
    >
      <td>{{ index +1 }}</td>
      <td>{{ movie.plot }}</td>
      <td>
        <v-img :src="movie.img"></v-img>
      </td>
      <td>{{ getMovieGenres(movie) }}</td>
<!--      <td>{{ movie.genres }}</td>-->
      <td>{{ movie.title }}</td>
      <td>{{ movie.creationDate }}</td>
      <td class="text-center">
        <v-btn color="primary">Edit</v-btn>
        &ensp;
        <v-btn color="error" @click="RemoveAllMovies">Delete</v-btn>
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
    title: "",
    filteredMovies: [],
  }),

  async mounted() {
    await this.retrieveMovies();
  },

  methods:{
    filter(){
      this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(this.title.toLowerCase()));
    },
    async retrieveMovies() {
      MovieDataService.getAll()
          .then(response => {
            this.movies = response.data;
            console.log(response.data);
            this.filter();

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
    removeMovie() {
      MovieDataService.delete(this.currentMovie.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "movie" });
          })
          .catch(e => {
            console.log(e);
          });
    }
    ,
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
            this.movie = response.data;
            this.setActiveMovie(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    //get movies
    getMovieGenres(movie) {
      return movie.genres.join(', ');
    }
  },
}
</script>

<style scoped>

</style>
