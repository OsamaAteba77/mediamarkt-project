import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
 
  const firebaseConfig = {
    apiKey: "AIzaSyAuNKLZrD__LtFeyhVjveiPKTnWEqzJHnw",
    authDomain: "mediamarkt-closne.firebaseapp.com",
    projectId: "mediamarkt-clone",
    storageBucket: "mediamarkt-clone.firebasestorage.app",
    messagingSenderId: "1097985423310",
    appId: "1:1097985423310:web:58e42e9fac7dc24929dd9f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Services
  const auth = getAuth(app);
  const db = getFirestore(app);

  return {
    provide: {
      auth,
      db
    }
  }
});