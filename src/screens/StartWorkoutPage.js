import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

// Redux
import {setCurrentWorkout} from '../slices/currentWorkoutSlice'

// Components
import Card, { mapDocumentToUi } from '../components/Card';

// Assets
import BicycleImage from "../assets/bicycle.png";
import RunningShoesImage from "../assets/running_shoes.png";
import SwimmerImage from "../assets/swimmer.png";

export default function StartWorkoutPage({navigation}) {
    const dispatch = useDispatch();
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const auth = getAuth()

    const loadAllWorkouts = async () => {
        const q = query(collection(db, "user_workouts"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const newWorkoutPlans = []
        querySnapshot.forEach(doc => {
            newWorkoutPlans.push(doc.data())
        })
        setWorkoutPlans(newWorkoutPlans);
    };

    useEffect(() => {
        loadAllWorkouts();
        setIsLoading(false);
    }, [])

    const startWorkout = (workoutItem) => {
        dispatch(setCurrentWorkout(workoutItem))
        navigation.navigate('Timer Workout')
    }

    const renderItem = ({ item }) => (
        <Pressable onPress={() => startWorkout({workoutContent: item.workoutContent, workoutTitle: item.workoutTitle})}>
            <Card style={styles.card} item={mapDocumentToUi(item)}/>
        </Pressable>
    )


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aerobic exercises</Text>
            <View style={styles.carousel}>
                <Pressable onPress={() => startWorkout({workoutContent: [{exerciseName: "Cycling"}]})}>
                    <View style={styles.icon}>
                        <Image source={BicycleImage} style={styles.image}/>
                    </View>
                </Pressable>  
                <Pressable onPress={() => startWorkout({workoutContent: [{exerciseName: "Running"}]})}>
                    <View style={styles.icon}>
                        <Image source={RunningShoesImage} style={styles.image}/>
                    </View>
                </Pressable>             
                <Pressable onPress={() => startWorkout({workoutContent: [{exerciseName: "Swimming"}]})}>
                    <View style={styles.icon}>
                        <Image source={SwimmerImage} style={styles.image}/>
                    </View>
                </Pressable>               
            </View>
            <Text style={styles.title}>Workout Plans</Text>         
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
    title: {
        alignSelf: 'center', // Override the default behaviour of stretching along cross axis
        margin: 20,
        fontSize: 15,
    },
    carousel: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 84,
        width: 84,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 8
    },
    image: {
        height: 25,
        width: 25
    },
    card: {
        marginVertical: 10,
    }
});