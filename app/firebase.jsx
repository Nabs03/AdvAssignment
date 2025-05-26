// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNt11xY9xoicRpCNLverP_V5w0pWF20fc",
  authDomain: "reactexercise-5bc13.firebaseapp.com",
  projectId: "reactexercise-5bc13",
  storageBucket: "reactexercise-5bc13.firebasestorage.app",
  messagingSenderId: "835368825549",
  appId: "1:835368825549:web:d6b7b8c3da36d7bdb9ef84",
  measurementId: "G-ZCPFSD8NFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);