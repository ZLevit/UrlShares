import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAn8wVHZG7mklmCdpH3HBSp8ElMmtdwzLQ",
  authDomain: "urlshares.firebaseapp.com",
  databaseURL: "https://urlshares-default-rtdb.firebaseio.com",
  projectId: "urlshares",
  storageBucket: "urlshares.appspot.com",
  messagingSenderId: "69137974305",
  appId: "1:69137974305:web:49405bb096d3db31708f60",
  measurementId: "G-2TNJ3KFS9J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
