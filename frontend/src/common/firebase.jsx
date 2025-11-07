// Firebase imports
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDdxBoyCdJfXsQ7jQjO3nlhDhI3XKu8Nwc",
  authDomain: "zidio-blog.firebaseapp.com",
  projectId: "zidio-blog",
  storageBucket: "zidio-blog.appspot.com",   
  messagingSenderId: "357674170499",
  appId: "1:357674170499:web:3e46c4881c6cbea33643b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Auth
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
