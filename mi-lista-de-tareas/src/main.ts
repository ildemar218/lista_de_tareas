import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/authStore";
import "./assets/styles.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 🔹 Llamar a initAuth para mantener la sesión
const authStore = useAuthStore();
authStore.initAuth();

app.mount("#app");
