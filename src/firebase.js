// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:  "AIzaSyB2wXAS14VEh53s4OIkNufyqu036FunCQc",
  authDomain: "mediamarkt--project.firebaseapp.com",
  projectId: "mediamarkt--project",
  storageBucket: "mediamarkt--project.firebasestorage.app",
  messagingSenderId: "68086790050",
  appId: "1:68086790050:web:604a43309db9f8423324fb",
  measurementId: "G-RDYC58KN36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
