// Import the functions you need from the SDKs you need
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

// Import other Firebase modules and necessary dependencies
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// db stuff
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FieldValue } from 'firebase/firestore'; // for serverTimeStamp nton ntoni

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBil_XPl3ePCQEHhqCBYzkn8Ld3hkZladU",
  authDomain: "mlab-task3.firebaseapp.com",
  projectId: "mlab-task3",
  storageBucket: "mlab-task3.appspot.com",
  messagingSenderId: "803869801640",
  appId: "1:803869801640:web:6b9e14586b7aa45f2dd69d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };

// Registration function
export const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Access the newly created user's UID
    const userUid = userCredential.user.uid;

    // Store additional user information in Firestore
    const db = getFirestore();
    const usersCollection = collection(db, 'users');

    await addDoc(usersCollection, {
      uid: userUid,
      name: name,
      email: email,
      createdAt: new Date(),
      updatedAt: serverTimestamp(),
      emailVerified: false,
      photoURL: null,
    });

    return { success: true };
  } catch (error) {
    // Handle registration error
    switch (error.code) {
      case 'auth/email-already-in-use':
        return { success: false, error: 'Email is already registered' };
      case 'auth/weak-password':
        return { success: false, error: 'Password is too weak' };
      default:
        return { success: false, error: error.message };
    }
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Get current user function
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Send email verification function
export const sendVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send password reset email function
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Timestamp serverTimestamp utility function
const serverTimestamp = () => {
  return { seconds: FieldValue.serverTimestamp() };
};
