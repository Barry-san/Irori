import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGkJaB7HMHP-xwcQNWiQnXjlOx4NyMLiM",
  authDomain: "shower-thoughts-66791.firebaseapp.com",
  projectId: "shower-thoughts-66791",
  storageBucket: "gs://shower-thoughts-66791.appspot.com",
  messagingSenderId: "311041479580",
  appId: "1:311041479580:web:9ef89b871db475d2b2ee59",
  measurementId: "G-QYXC3DFWXT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
