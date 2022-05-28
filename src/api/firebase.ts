// Import the functions you need from the SDKs you need
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVa4Rt9yzLOUdktX--0zmahSVUYyqDEio",
  authDomain: "macro-5f233.firebaseapp.com",
  projectId: "macro-5f233",
  storageBucket: "macro-5f233.appspot.com",
  messagingSenderId: "1007503486944",
  appId: "1:1007503486944:web:abb6a1b5d2b1b85ad48585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });
  }, []);

  return {
    user
  };
}