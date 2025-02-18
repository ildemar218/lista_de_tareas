import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import TaskList from "./views/TaskList.vue";
import { useAuthStore } from "./stores/authStore";

const routes = [
  { path: "/", component: LoginPage }, // Página de inicio de sesión
  { path: "/tareas", component: TaskList, meta: { requiresAuth: true } }, // Página de tareas protegida
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔹 Proteger la ruta de tareas si no está autenticado
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next("/"); // Si no está autenticado, lo lleva al login
  } else {
    next();
  }
});

export default router;
