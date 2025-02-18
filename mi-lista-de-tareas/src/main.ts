import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 🔹 Asegúrate de que el router está bien importado
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(router); // 🔹 Agregar el router

app.mount("#app");
