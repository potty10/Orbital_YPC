import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVa4Rt9yzLOUdktX--0zmahSVUYyqDEio',
  authDomain: 'macro-5f233.firebaseapp.com',
  projectId: 'macro-5f233',
  storageBucket: 'macro-5f233.appspot.com',
  messagingSenderId: '1007503486944',
  appId: '1:1007503486944:web:abb6a1b5d2b1b85ad48585',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function useAuthentication() {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = getAuth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStatusChanged;
  }, []);
  return {
    user,
  };
}

export {
  useAuthentication,
  db,
};
