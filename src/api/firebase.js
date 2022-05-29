import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function useAuthentication() {
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
        user
    };
}