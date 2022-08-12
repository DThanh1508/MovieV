<template>
  <v-app>
    <v-card>
      <v-toolbar>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Admin page</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-text-field
            class="mt-5"
            label="What is here?"
            prepend-inner-icon="mdi-file-find"
            append-inner-icon="mdi-magnify"
            @change="enter()"
        >
<!--          <template v-slot:label>-->
<!--            What is <strong>icon</strong> here? <v-icon style="vertical-align: middle">-->
<!--            mdi-file-find-->
<!--          </v-icon>-->
<!--          </template>-->
        </v-text-field>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
            <v-tab>
              <router-link to="/">
                <v-btn
                    :loading="loading[3]"
                    :disabled="loading[3]"
                    color="info"
                    @click="load(3)"
                >
                  Home
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </template>
                </v-btn>
              </router-link>
            </v-tab>
            <v-tab>
              <router-link to="/add" class="navbar-brand">Create</router-link>
            </v-tab>
        </template>
      </v-toolbar>

      <v-window v-model="tab">
        <v-window-item>
          <v-card flat>
            <v-card-text>Home/CRUD</v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    <router-view />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import AddMovie from "@/components/movie/AddMovie";
// import MovieList from "@/components/movie/MovieList";

export default {
  name: 'App',

  components: {
    // HelloWorld,
    // AddMovie,
    // MovieList
  },

  data: () => ({
    tab: null,
    loading: [],
   }),
  methods: {
    enter() {
      console.log('enter')
    },

    load (i) {
      this.loading[i] = true
      setTimeout(() => (this.loading[i] = false), 200)
    },
  },
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
