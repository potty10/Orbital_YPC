import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import { msToTime } from '../utils/DateTimeUtil';

export default function UserFeedPage() {
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const auth = getAuth()

    // Input: Object with created, userId, workoutContent, workoutDuration (ms), workoutTitle
    // Output: Object with mainTitle, subTitle, content
    const mapDocumentToUi = (document) => {
        let content = ""
        document.workoutContent.forEach(exercise => {
            if (exercise.exerciseRepititions && exercise.exerciseWeight)
            content = content.concat(`${exercise.exerciseName} x ${exercise.exerciseRepititions} (${exercise.exerciseWeight} kg)\n`)
            else
            content = content.concat(`${exercise.exerciseName}\n`)
        })
        return {
            mainTitle: document.workoutTitle,
            subTitle: msToTime(document.workoutDuration),
            content: content
        }
    }

    let loadAllHistory = async () => {
        const q = query(collection(db, "user_history"), where("userId", "==", auth.currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        let newWorkoutHistory = [];
        querySnapshot.forEach((doc) => {
          let workoutItem = mapDocumentToUi(doc.data());
          newWorkoutHistory.push(workoutItem);
        });   
        setWorkoutHistory(newWorkoutHistory);
        setIsLoading(false);
        // setIsRefreshing(false);
    };

    // TODO: Load data from database
    useEffect(() => {
        // setWorkoutPlans(transformData(getWorkouts()));
        loadAllHistory ();
    }, [])


    const renderItem = ({ item, index }) => (
        <Card style={styles.card} item={item} />
    )

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : <FlatList data={workoutHistory} renderItem = {renderItem}/>}          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
        alignItems: "stretch", // Default value, width of items stretch to fit container width
        justifyContent: "flex-start" // Default value
    },
});

const cardStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 143,
        padding: 22,
        marginVertical: 10,
    },
    card: {
        marginVertical: 10,
    }
});