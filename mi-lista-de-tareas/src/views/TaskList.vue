<template>
  <div class="container">
    <h1>Lista de Tareas</h1>
    <button @click="authStore.logout">Cerrar Sesión</button>

    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <input
          type="checkbox"
          :checked="task.completado"
          @change="() => toggleTaskCompletion(task)"
        />

        <template v-if="editingTaskId === task.id">
          <input v-model="editTask.titulo" type="text" class="input-field" />
          <input
            v-model="editTask.descripcion"
            type="text"
            class="input-field"
          />
          <button @click="saveTask(task.id)">Guardar</button>
          <button @click="cancelEdit">Cancelar</button>
        </template>

        <template v-else>
          <div class="task-content">
            <span class="task-title">{{ task.titulo }}</span>
            <span class="task-desc">{{ task.descripcion }}</span>
          </div>
          <div class="task-buttons">
            <button @click="() => startEditing(task)">Editar</button>
            <button @click="() => deleteTask(task.id)">Eliminar</button>
          </div>
        </template>
      </li>
    </ul>

    <h3>Agregar Nueva Tarea</h3>
    <form @submit.prevent="createTask" class="task-form">
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

const authStore = useAuthStore();
const taskStore = useTaskStore();

interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  completado: boolean;
}

const newTask = ref<Omit<Task, "id" | "completado">>({
  titulo: "",
  descripcion: "",
});

const editingTaskId = ref<string | null>(null);
const editTask = ref<Omit<Task, "id" | "completado">>({
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

const startEditing = (task: Task) => {
  editingTaskId.value = task.id;
  editTask.value = { titulo: task.titulo, descripcion: task.descripcion };
};

const saveTask = async (id: string) => {
  if (!editTask.value.titulo || !editTask.value.descripcion) return;
  await taskStore.updateTaskDetails(
    id,
    editTask.value.titulo,
    editTask.value.descripcion
  );
  editingTaskId.value = null;
};

const cancelEdit = () => {
  editingTaskId.value = null;
};

onMounted(() => {
  taskStore.fetchTasks();
});
</script>
