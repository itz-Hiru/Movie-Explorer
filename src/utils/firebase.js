import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserDocument = async (user) => {
  try {
    if (!user) throw new Error("No authenticated user found.");
    
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      lastUpdated: new Date().toISOString(),
    });
    console.log("User document created successfully");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export const getProfileLastUpdated = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists()
      ? userDoc.data().lastUpdated || "Not available"
      : "Not available";
  } catch (error) {
    console.error("Error fetching last update:", error);
    return "Not available";
  }
};

export const reAuthenticate = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    throw new Error("Re-authentication failed. Please check your password.");
  }
};

export const updateEmail = async (newEmail) => {
  try {
    if (auth.currentUser) {
      await firebaseUpdateEmail(auth.currentUser, newEmail);
      return true;
    }
    throw new Error("No authenticated user found.");
  } catch (error) {
    throw new Error("Failed to update email.");
  }
};

export const updatePassword = async (user, newPassword) => {
  try {
    if (!user) throw new Error("No authenticated user found.");
    await firebaseUpdatePassword(user, newPassword);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      lastUpdated: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Firebase error:", error);
    throw new Error(error.message || "Failed to update password.");
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw new Error("Failed to send password reset email.");
  }
};

export const updateUserName = async (user, displayName) => {
  try {
    if (!user) throw new Error("No authenticated user found.");
    if (typeof displayName !== "string" || !displayName.trim()) {
      throw new Error("Invalid display name");
    }

    await updateProfile(user, {
      displayName: displayName.trim(),
    });

    return true;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile.");
  }
};
