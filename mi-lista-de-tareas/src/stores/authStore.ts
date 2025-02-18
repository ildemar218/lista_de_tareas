import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as FirebaseUser | null,
  }),

  actions: {
    async register(email: string, password: string, router: any) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        router.push("/tareas");
      } catch (error) {
        console.error("Error al registrarse:", error);
      }
    },

    async login(email: string, password: string, router: any) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        router.push("/tareas");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },

    async logout(router: any) {
      try {
        await signOut(auth);
        this.user = null;
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },

    // 🔹 Escuchar cambios en la autenticación
    initAuth() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
  },
});
