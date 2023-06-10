import { createApp } from "vue";
import store from "./store";
import router from "./router";


import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";

import "./index.css";
import App from "./App.vue";

createApp(App).use(store).use(router).mount("#app");
