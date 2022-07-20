import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, ActivityIndicator } from 'react-native';
import { Button } from '@rneui/themed';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db, useAuthentication } from '../../firebase';

function Card({ item }) {
    return (
        <View style={cardStyle.container}>
            <Text style={cardStyle.header}>{item?.exerciseName}</Text>         
            <Text>{item?.exerciseRepititions}</Text>
            <Text>{item?.exerciseWeight}</Text>
        </View>
    );
  }

export default function WorkoutSummaryPage({navigation}) {
    const workoutTitle = `Workout Completed (${(new Date()).toLocaleDateString('en-SG')})`
    const workoutContent = [ {exerciseName: "Running"}]
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthentication()

    let saveWorkoutToHistory = async () => {
        setIsLoading(true)
        let newEntry = {
            workoutTitle: workoutTitle,
            workoutContent: workoutContent,
            workoutDuration: 3600000, //Number of milliseconds
            userId: user.uid,
            created: new Date()
        };
        const docRef = await addDoc(collection(db, "user_history"), newEntry); 
        setIsLoading(false);
        // setIsRefreshing(false);
    };
 
    const renderItem = ({ item }) => (
        <Card item={item}/>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.header} textAlign={'center'}>{workoutTitle}</Text>
            <FlatList data={workoutContent} renderItem={renderItem} />
            <View style={styles.buttonRow}>
                <Button title="Exit"/>
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

const cardStyle = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 5,
    },
    header: {
      marginBottom: 8
    }
});