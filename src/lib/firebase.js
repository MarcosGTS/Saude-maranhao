// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBL1VEmo38HVh61ZYEoJBKKWJ9UMunS8Mw",
  authDomain: "inova-desafio-final.firebaseapp.com",
  projectId: "inova-desafio-final",
  storageBucket: "inova-desafio-final.firebasestorage.app",
  messagingSenderId: "499388788348",
  appId: "1:499388788348:web:2ec11301597f53751723f9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
