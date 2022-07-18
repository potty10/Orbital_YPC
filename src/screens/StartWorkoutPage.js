import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

// Assets
import BicycleImage from "../assets/bicycle.png";
import RunningShoesImage from "../assets/running_shoes.png";
import SwimmerImage from "../assets/swimmer.png";
import { NavigationContainer } from '@react-navigation/native';

const workoutPlans = [
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
        mainTitle: "Arm day",
        subTitle: "1 Hour",
        content: "5x5 Deadlifts\n 3x8 Lat Pulldowns"
    }
];

export default function StartWorkoutPage({navigation}) {
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

    const loadAllWorkouts = async () => {
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

    const startWorkout = () => {
        navigation.navigate('Timer Workout')
    }

    // TODO: Load data from database
    useEffect(() => {
        // setWorkoutPlans(transformData(getWorkouts()));
        loadAllWorkouts();
    }, [])

    const renderItem = ({ item }) => (
        <Pressable><Card style={styles.card} item={item}/></Pressable>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aerobic exercises</Text>
            <View style={styles.carousel}>
                <Pressable onPress={startWorkout}>
                    <View style={styles.icon}>
                        <Image source={BicycleImage} style={styles.image}/>
                    </View>
                </Pressable>
                
                <View style={styles.icon}>
                    <Image source={RunningShoesImage} style={styles.image}/>
                </View>
                <View style={styles.icon}>
                    <Image source={SwimmerImage} style={styles.image}/>
                </View>
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
        margin: 30,
        fontSize: 15,
    },
    carousel: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
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