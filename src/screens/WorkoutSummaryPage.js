import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db, useAuthentication } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import SimpleCard from '../components/SimpleCard';

export default function WorkoutSummaryPage({navigation}) {
    const dispatch = useDispatch();
    const { workoutContent, workoutTitle, workoutDuration } = useSelector(state => state.currentWorkout)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthentication()

    let saveWorkoutToHistory = async () => {
        setIsLoading(true)
        let newEntry = {
            workoutTitle: `Completed: ${workoutTitle}`,
            workoutContent: workoutContent,
            workoutDuration: workoutDuration, //Number of milliseconds
            userId: user.uid,
            created: new Date()
        };
        const docRef = await addDoc(collection(db, "user_history"), newEntry); 
        setIsLoading(false);
        Alert.alert("Good Job", null, [
            { text: "close", onPress: () => navigation.navigate("Feed") }
        ])
        // setIsRefreshing(false);
    };
 
    const cancelSave = () => {
        Alert.alert("Are you sure?", "The workout will not be saved if you cancelled", [
            {
                text: "No",
                style: "cancel"
              },
            { text: "Yes", onPress: () => navigation.navigate("Workout List") }
        ])
    }

    const renderItem = ({ item }) => (
        <SimpleCard item={item}/>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.header} textAlign={'center'}>{workoutTitle}</Text>
            <Text style={styles.header} textAlign={'center'}>
                {`Duration: ${workoutDuration} seconds`}
            </Text>
            <FlatList data={workoutContent} renderItem={renderItem} />
            <View style={styles.buttonRow}>
                <Button title="Cancel" onPress={cancelSave}/>
                <Button title="Save" loading={isLoading} onPress={saveWorkoutToHistory}/>
            </View>   
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
    header: {
        marginBottom: 20, 
        fontSize: 20, 
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});
