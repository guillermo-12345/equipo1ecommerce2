// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfAJnhRLGif5Rw537AQmounfGVi0cST10",
  authDomain: "equipo1-ecommerce.firebaseapp.com",
  projectId: "equipo1-ecommerce",
  storageBucket: "equipo1-ecommerce.appspot.com",
  messagingSenderId: "66738131494",
  appId: "1:66738131494:web:e199a3bbf8ca100a010ce7",
  measurementId: "G-3B4BKNN2L6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };
