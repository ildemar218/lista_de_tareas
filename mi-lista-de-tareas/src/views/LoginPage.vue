<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router"; // 🔹 Importar useRouter

const authStore = useAuthStore();
const router = useRouter(); // 🔹 Obtener instancia del router

const email = ref("");
const password = ref("");

const login = () => {
  authStore.login(email.value, password.value, router); // 🔹 Pasar router
};

const register = () => {
  authStore.register(email.value, password.value, router); // 🔹 Pasar router
};

const logout = () => {
  authStore.logout(router); // 🔹 Pasar router
};
</script>
