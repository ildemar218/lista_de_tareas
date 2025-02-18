<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

// 🔹 Redirigir automáticamente al usuario si está autenticado
watchEffect(() => {
  if (authStore.user) {
    router.push("/tareas");
  }
});
</script>

<template>
  <div v-if="!authStore.user">
    <h1>Registro e Inicio de Sesión</h1>
    <input v-model="email" placeholder="Correo electrónico" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="authStore.register(email, password, router)">
      Registrarse
    </button>
    <button @click="authStore.login(email, password, router)">
      Iniciar Sesión
    </button>
  </div>

  <div v-else>
    <router-view />
  </div>
</template>
