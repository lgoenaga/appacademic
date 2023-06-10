import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
        home: {
            loading: false,
            data: {},
        },
        students: {
            loading: false,
            data: [],
        },
        curses: {
            data: {},
            loading: false,
        },
        notification: {
            show: false,
            type: "success",
            message: "",
        },
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post("/register", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },
        login({ commit }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },
        logout({ commit }) {
            return axiosClient.post("/logout").then((response) => {
                commit("logout");
                return response;
            });
        },
        getUser({ commit }) {
            return axiosClient.get("/user").then((res) => {
                console.log(res);
                commit("setUser", res.data);
            });
        },
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem("TOKEN");
        },

        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem("TOKEN", token);
        },
        homeLoading: (state, loading) => {
            state.home.loading = loading;
        },
        setHomeData: (state, data) => {
            state.home.data = data;
        },
        setStudentsLoading: (state, loading) => {
            state.students.loading = loading;
        },
        setCursesLoading: (state, loading) => {
            state.curses.loading = loading;
        },
        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        },
    },
    modules: {},
});

export default store;
