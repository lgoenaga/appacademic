import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Students from "../views/Students.vue";
import Curses from "../views/Curses.vue";
import store from "../store";

import EstudianteList from "../views/estudiantes/EstudianteList.vue";
import EstudianteNew from "../views/estudiantes/EstudianteNew.vue";
import EstudianteEdit from "../views/estudiantes/EstudianteEdit.vue";
import EstudianteView from "../views/estudiantes/EstudianteView.vue";
import CursoList from "../views/cursos/CursoList.vue";
import CursoNew from "../views/cursos/CursoNew.vue";
import CursoEdit from "../views/cursos/CursoEdit.vue";
import CursoEstudianteList from "../views/cursosestudiantes/CursoEstudianteList.vue";

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
                path: "/listarE",
                name: "listarE",
                component: EstudianteList,
            },

            {
                path: "/createE",
                name: "createE",
                component: EstudianteNew,
            },
            {
                path: "/editE/:id",
                name: "editE",
                component: EstudianteEdit,
            },
            {
                path: "/viewE/:id",
                name: "viewE",
                component: EstudianteView,
            },
            {
                path: "/listarC",
                name: "listarC",
                component: CursoList,
            },
            {
                path: "/createC",
                name: "createC",
                component: CursoNew,
            },
            {
                path: "/editC/:id",
                name: "editC",
                component: CursoEdit,
            },
            {
                path: "/listarCE",
                name: "listarCE",
                component: CursoEstudianteList,
            },
        ],
    },

    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        meta: { isGuest: true },
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
