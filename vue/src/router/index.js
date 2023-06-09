import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Students from "../views/Students.vue";
import Curses from "../views/Curses.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        redirect: "/home",
        meta: { requiresAuth: true },
        component: DefaultLayout,
        children: [
            {
                path: "/home",
                name: "Home",
                component: Home,
            },
            {
                path: "/students",
                name: "Students",
                component: Students,
            },
            {
                path: "/curses",
                name: "Curses",
                component: Curses,
            },
        ],
    },

    {
        path: "/auth",
        redirect: "/login",
        name: "AuthLayout",
        meta:{ isGuest: true },
        component: AuthLayout,
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },

            {
                path: "/register",
                name: "Register",
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
