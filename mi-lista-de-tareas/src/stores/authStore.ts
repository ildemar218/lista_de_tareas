import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { useRouter } from "vue-router"; // 🔹 Importar useRouter dentro del store

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as FirebaseUser | null,
  }),

  actions: {
    async register(email: string, password: string) {
      const router = useRouter(); // 🔹 Obtener instancia del router
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        router.push("/tareas"); // 🔹 Redirigir a tareas
      } catch (error) {
        console.error("Error al registrarse:", error);
      }
    },

    async login(email: string, password: string) {
      const router = useRouter(); // 🔹 Obtener instancia del router
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        router.push("/tareas"); // 🔹 Redirigir a tareas
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },

    async logout() {
      const router = useRouter(); // 🔹 Obtener instancia del router
      try {
        await signOut(auth);
        this.user = null;
        router.push("/"); // 🔹 Redirigir al login
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
  },
});
