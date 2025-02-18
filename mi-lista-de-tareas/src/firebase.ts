import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (usa los datos de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyApR707amE4Dlbuz1DmM6nkZtrSqpy_3Jw",
  authDomain: "lista-de-tareas-2cf73.firebaseapp.com",
  projectId: "lista-de-tareas-2cf73",
  storageBucket: "lista-de-tareas-2cf73.firebasestorage.app",
  messagingSenderId: "725081296004",
  appId: "1:725081296004:web:aaaa5c9e1c2f02e17e46d1",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
