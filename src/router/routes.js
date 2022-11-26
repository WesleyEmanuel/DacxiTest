import Vue from "vue";
import Router from "vue-router";
import HomeApp from "@/view/HomeApp";
import AboutDacxi from "@/view/AboutDacxi";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeApp
        },
        {
            path: "/about",
            name: "about",
            component: AboutDacxi
        }
    ]
})