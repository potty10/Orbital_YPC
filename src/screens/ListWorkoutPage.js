import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

const dummyWorkoutPlans = [
    {
        mainTitle: "HIIT 1",
        subTitle: "30 Minutes",
        content: "40 Burpees"
    },
    {
        mainTitle: "Back day",
        subTitle: "1 Hour",
        content: "5x5 Deadlifts\n 3x8 Lat Pulldowns"
    },
    {
        mainTitle: "Leg day",
        subTitle: "1 Hour",
        content: "5x5 Squats\n 3x8 3x8 Lunges"
    },
    {
        mainTitle: "Arm day",
        subTitle: "1 Hour",
        content: "300 Bicep curls\n 300 Tricep pushdown"
    }
];

export default function ListWorkoutPage({navigation}) {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
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
            subTitle: "1 Hour",
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
        setIsLoading(false);
        // setIsRefreshing(false);
    };

    // TODO: Load data from database
    useEffect(() => {
        // setWorkoutPlans(transformData(getWorkouts()));
        loadAllWorkouts();
    }, [])

    const renderItem = ({ item }) => (
        <Pressable><Card style={styles.card} item={item} /></Pressable>
    )

    return (
        <View style={styles.container}>
            {/* <Pressable onPress={() => navigation.navigate('Create Workout')}>
                <Text>Create New Workout</Text>
            </Pressable> */}
            {/* <Text>
                {workoutPlans}
            </Text> */}
            {isLoading ? <ActivityIndicator/> : <FlatList data={workoutPlans} renderItem={renderItem} />}          
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
