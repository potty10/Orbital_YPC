import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';


export default function ListWorkoutPage({navigation}) {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const auth = getAuth()

    // Input: Object with workoutContet, workoutTitle
    // Output: Object with mainTitle, subTitle, content
    const mapDocumentToUi = (document) => {
        let content = ""
        document.workoutContent.forEach(exercise => {
            content = content.concat(`${exercise.exerciseName} x ${exercise.exerciseRepititions} (${exercise.exerciseWeight} kg)\n`)
        })
        return {
            mainTitle: document.workoutTitle,
            subTitle: document?.workoutDuration,
            content: content
        }
    }

    let loadAllWorkouts = async () => {
        const q = query(collection(db, "user_workouts"), where("userId", "==", auth.currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        let exerciseList = [];
        querySnapshot.forEach((doc) => {
          let workoutItem = mapDocumentToUi(doc.data());
          exerciseList.push(workoutItem);
        });   
        setWorkoutPlans(exerciseList);
        
        // setIsRefreshing(false);
    };

    // TODO: Load data from database
    useEffect(() => {
        loadAllWorkouts();
        setIsLoading(false);
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        loadAllWorkouts()
        setRefreshing(false)
    })

    const renderItem = ({ item }) => (
        <Pressable><Card style={styles.card} item={item} /></Pressable>
    )

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator/> : 
            <FlatList data={workoutPlans} renderItem={renderItem} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            } />}          
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
    card: {
        marginVertical: 10,
    }
});
