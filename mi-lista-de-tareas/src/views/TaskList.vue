<template>
  <div>
    <h1>Lista de Tareas</h1>
    <button @click="logout">Cerrar Sesión</button>

    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.completado"
          @change="() => toggleTaskCompletion(task)"
        />
        {{ task.titulo }} - {{ task.descripcion }}
        <button @click="() => deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>

    <h3>Agregar Nueva Tarea</h3>
    <form @submit.prevent="createTask">
      <input
        v-model="newTask.titulo"
        type="text"
        placeholder="Título"
        required
      />
      <input
        v-model="newTask.descripcion"
        type="text"
        placeholder="Descripción"
        required
      />
      <button type="submit">Añadir</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router"; // 🔹 Importar useRouter

interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  completado: boolean;
}

const authStore = useAuthStore();
const taskStore = useTaskStore();
const router = useRouter(); // 🔹 Obtener instancia del router

const newTask = ref<Omit<Task, "id" | "completado">>({
  titulo: "",
  descripcion: "",
});

const createTask = async () => {
  if (!newTask.value.titulo || !newTask.value.descripcion) return;
  await taskStore.createTask(newTask.value.titulo, newTask.value.descripcion);
  newTask.value = { titulo: "", descripcion: "" };
};

const toggleTaskCompletion = (task: Task) => {
  taskStore.updateTask(task.id, !task.completado);
};

const deleteTask = (id: string) => {
  taskStore.deleteTask(id);
};

// 🔹 Modificar logout para incluir router
const logout = async () => {
  await authStore.logout();
  router.push("/"); // 🔹 Redirigir al login después de cerrar sesión
};

onMounted(() => {
  console.log("TaskList montado"); // 🔹 Verificar si se monta correctamente
  taskStore.fetchTasks();
});
</script>
