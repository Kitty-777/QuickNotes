import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJQW9GukOGq9lEwjyqGeMxnQLQWohBgbU",
  authDomain: "quick-notes-60de5.firebaseapp.com",
  projectId: "quick-notes-60de5",
  storageBucket: "quick-notes-60de5.firebasestorage.app",
  messagingSenderId: "1059122650516",
  appId: "1:1059122650516:web:4e0b27dff1d801759d0381"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
