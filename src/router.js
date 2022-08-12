import { createWebHistory, createRouter } from "vue-router";
const routes =  [
    {
        path: "/",
        name: "movies-list",
        component: () => import("./components/movie/MovieList")
    },
    {
        path: "/movie/:id",
        name: "movie-detail",
        component: () => import("./components/movie/DetailMovie")
    },
    {
        path: "/add",
        name: "movie-add",
        component: () => import("./components/movie/AddMovie")
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
