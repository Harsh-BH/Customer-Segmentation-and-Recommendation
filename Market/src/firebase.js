// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtqo8dDoDitPUBTE5CKVwVx-DnE6FIeuI",
  authDomain: "theta-voyager-427310-j0.firebaseapp.com",
  projectId: "theta-voyager-427310-j0",
  storageBucket: "theta-voyager-427310-j0.appspot.com",
  messagingSenderId: "998804409455",
  appId: "1:998804409455:web:4145b55073b2c0ef34519a",
  measurementId: "G-YZFQJEPYMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
