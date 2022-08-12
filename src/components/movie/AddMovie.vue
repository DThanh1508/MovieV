<template>
  <div class="text-center">
    <v-sheet
        max-width="50%"
        class="mx-auto mt-8"
        elevation="12"
        height="100%"
        width="100%"
    >
      <v-form

          v-model="valid"
          lazy-validation
      >
        <v-form
            ref="form"
          v-if="!submitted"
        >
          <div class="d-flex" m="15">
            <v-hover
                v-slot="{ isHovering, props }"
            >
              <v-card
                  :elevation="isHovering ? 12 : 2"
                  height="50"
                  max-width="350"
                  class="mx-auto mt-6"
                  v-bind="props"
              >
                <v-card-text class="m-auto text-center text-h6">
                  Let's create new movie!
                </v-card-text>
              </v-card>
            </v-hover>
          </div>
          <v-text-field
              class="mt-5"
              v-model="movie.plot"
              :counter="25"
              :rules="plotRules"
              label="Plot"
              name="plot"
              id="plot"
              required
          ></v-text-field>
          <!--        <v-select-->
          <!--            v-model="selectedGenres"-->
          <!--            :items="genres"-->
          <!--            label="Favorite Genres"-->
          <!--            multiple-->
          <!--        >-->
          <!--        </v-select>-->

          <v-text-field
              v-model="movie.genres"
              label="Genres"
              required
              name="genres"
              id="genres"
          ></v-text-field>

          <v-text-field
              v-model="movie.title"
              label="Title"
              name="title"
              id="title"
          ></v-text-field>

          <v-text-field
              v-model="movie.creationDate"
              label="Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              name="creationDate"
              id="creationDate"
          ></v-text-field>

          <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
          ></v-checkbox>

          <v-btn
              color="error"
              class="mr-4"
              @click="reset"
          >
            Reset Form
          </v-btn>

          <v-btn
              color="primary"
              @click="saveMovie"
          >
            Create
          </v-btn>
        </v-form>
        <v-form
          v-else
        >
          <h3>Successfully!</h3>
          <v-btn
              color="yellow"
              @click="newMovie"
          >
            Create
          </v-btn>
        </v-form>
      </v-form>
    </v-sheet>

    <div class="py-3"></div>
  </div>
</template>

<script>
import MovieDataService from "../../components/services/MovieDataService";
export default {
  name: "AddMovie",
  data: () => ({
    movie: {
      id: null,
      plot: "",
      genres: "",
      title:"",
      creationDate: ""
    },
    submitted: false,
    genres: [
      'Watermelons',
      'Zucchini',
    ],
    selectedGenres: [],

    // Just data form
    valid: true,
    plot: '',
    plotRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 25) || 'Name must be less than 10 characters',
    ],
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  //  Data input
  }),

  methods: {
    // Save date
    saveMovie() {
      const data = {
        plot: this.movie.plot,
        genres: this.movie.genres.trim().split(','),
        title: this.movie.title,
        creationDate: this.movie.creationDate
      };
      console.log(data),
      MovieDataService.create(data)
          .then(response => {
            this.movie.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },
    newMovie() {
      this.submitted = false;
      this.movie = {};
    },
    // Validate input
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>

<style scoped>

</style>
