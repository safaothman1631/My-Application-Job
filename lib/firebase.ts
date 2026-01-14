import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDCBEwSvShq8vJIvhIyJ29EYAvhgYGzTF4",
  authDomain: "bazari-app-1f2a7.firebaseapp.com",
  projectId: "bazari-app-1f2a7",
  storageBucket: "bazari-app-1f2a7.firebasestorage.app",
  messagingSenderId: "1029782849043",
  appId: "1:1029782849043:web:2e3b01838d15cd2e2f4fc1"
};

// Initialize Firebase (client-side)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
