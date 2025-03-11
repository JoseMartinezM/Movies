// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAMhWVAAmCSK_kwsKYkT2MtLRgNzh9gzU",
  authDomain: "moviesreact-6d789.firebaseapp.com",
  projectId: "moviesreact-6d789",
  storageBucket: "moviesreact-6d789.firebasestorage.app",
  messagingSenderId: "41064285272",
  appId: "1:41064285272:web:38a946f7b2006ced24f62d",
  measurementId: "G-0WZ8DJYGX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); // Changed to export
export const auth = getAuth(app);
export const db = getFirestore(app);