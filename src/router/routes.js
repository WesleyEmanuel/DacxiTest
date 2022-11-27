import Vue from "vue";
import Router from "vue-router";
import HomeApp from "@/view/HomeApp";
import PresentationHome from "@/view/PresentationHome";
import AboutDacxi from "@/view/AboutDacxi";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: PresentationHome
        },
        {
            path: "/app-home",
            name: "app-home",
            component: HomeApp
        },
        {
            path: "/about",
            name: "about",
            component: AboutDacxi
        }
    ]
})