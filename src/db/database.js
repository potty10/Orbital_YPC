/*
* Make API calls to Firebase
*/
import Constants from 'expo-constants';
import {
    collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc,
  } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

export let loadAllWorkoutsByUser, deleteWorkoutByUserAndId;

if (Constants.manifest.extra.mock) {
    loadAllWorkoutsByUser = async () => {
        console.log("getting mock")
        return [
            {
                workoutTitle: 'Intense Squat Exercise',
                workoutContent: [ { exerciseWeight: 1, exerciseRepititions: 1, exerciseName: 'Squats' } ],
                userId: 'UvhKDPjHwdUhpbkSewLMsOHYD783',
                workoutId: '23BETpNpqM3z9i0WKZ4L'
            }
        ]
    }
    deleteWorkoutByUserAndId = async (workoutId) => {

    }
} else {
    loadAllWorkoutsByUser = async () => {
        const auth = getAuth();
        const q = query(collection(db, 'user_workouts'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        // Note: querySnapshot is not an array, DOES NOT have the map function
        const exerciseList = [];
        querySnapshot.forEach((document) => {
            const workoutItem = document.data();
            workoutItem.workoutId = document.id;
            exerciseList.push(workoutItem);
        });
        return exerciseList;
        
    }
    deleteWorkoutByUserAndId = async (workoutId) => {
        // Firebase api does not return any errors if delete failed
        await deleteDoc(doc(db, 'user_workouts', workoutId));
        return workoutId;
    }
}

