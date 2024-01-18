import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  verifyBeforeUpdateEmail, 
  signOut, 
  sendPasswordResetEmail, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  PhoneAuthProvider, 
  signInWithCredential 
} from 'firebase/auth'; 
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  where,
  getDoc, 
  updateDoc, 
  doc 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { 
  firebaseApp, 
  auth, 
  db, 
  storage,
  RecaptchaVerifier, 
  PhoneAuthProvider, 
  signInWithCredential, 
  signInWithPhoneNumber, 
  sendPasswordResetEmail, 
  verifyBeforeUpdateEmail, 
  signOut, 
  collection, 
  getDocs, 
  query, 
  where, 
  getDoc, 
  updateDoc, 
  doc
};
