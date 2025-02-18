import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta

// Definir interfaz para las tareas
interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  completado: boolean;
}

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[], // 🔹 Tipado correcto para las tareas
  }),

  actions: {
    // Obtener todas las tareas
    async fetchTasks() {
      try {
        const querySnapshot = await getDocs(collection(db, "tareas"));
        this.tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, "id">), // 🔹 Asegurar que `doc.data()` tenga la estructura correcta
        }));
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    },

    // Crear tarea
    async createTask(titulo: string, descripcion: string) {
      try {
        const docRef = await addDoc(collection(db, "tareas"), {
          titulo,
          descripcion,
          completado: false,
        });
        this.tasks.push({
          id: docRef.id,
          titulo,
          descripcion,
          completado: false,
        });
      } catch (error) {
        console.error("Error al crear tarea:", error);
      }
    },

    // Actualizar tarea
    async updateTask(id: string, completado: boolean) {
      try {
        const taskRef = doc(db, "tareas", id);
        await updateDoc(taskRef, { completado });

        // 🔹 Usar `map` en lugar de modificar directamente el array
        this.tasks = this.tasks.map((task) =>
          task.id === id ? { ...task, completado } : task
        );
      } catch (error) {
        console.error("Error al actualizar tarea:", error);
      }
    },

    // Eliminar tarea
    async deleteTask(id: string) {
      try {
        const taskRef = doc(db, "tareas", id);
        await deleteDoc(taskRef);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
      }
    },
  },
});
