<script setup lang="ts">
import "@/assets/styles.css"; // 🔹 Usamos el archivo global de estilos
import { ref, watchEffect } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref(""); // 🔹 Manejo de errores
const loading = ref(false); // 🔹 Estado de carga

// 🔹 Redirigir automáticamente al usuario si está autenticado
watchEffect(() => {
  if (authStore.user) {
    router.push("/tareas");
  }
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Por favor, ingresa correo y contraseña.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.login(email.value, password.value, router);
  } catch (error) {
    errorMessage.value = "Error al iniciar sesión. Verifica tus datos.";
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Por favor, ingresa correo y contraseña.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await authStore.register(email.value, password.value, router);
  } catch (error) {
    errorMessage.value = "Error al registrarse. Inténtalo de nuevo.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="!authStore.user" class="login-container">
    <h1 class="login-title">Registro e Inicio de Sesión</h1>

    <input
      v-model="email"
      placeholder="Correo electrónico"
      class="input-field"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
      class="input-field"
    />

    <button :disabled="loading" @click="handleRegister" class="btn">
      {{ loading ? "Registrando..." : "Registrarse" }}
    </button>
    <button :disabled="loading" @click="handleLogin" class="btn">
      {{ loading ? "Iniciando..." : "Iniciar Sesión" }}
    </button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>

  <div v-else class="app-container">
    <router-view />
  </div>
</template>
