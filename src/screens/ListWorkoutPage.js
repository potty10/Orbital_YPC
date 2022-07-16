import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import Card from '../components/Card';

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
    let [workoutPlans, setWorkoutPlans] = useState([]);

    // TODO: Load data from database
    useEffect(() => {
        // setWorkoutPlans(transformData(getWorkouts()));
        setWorkoutPlans(dummyWorkoutPlans);
    }, [])

    const renderItem = ({ item }) => (
        <Pressable><Card style={styles.card} item={item} /></Pressable>
    )

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Create Workout')}>
                <Text>Create New Workout</Text>
            </Pressable>
            {/* <Text>
                {workoutPlans}
            </Text> */}
            <FlatList data={workoutPlans} renderItem={renderItem} />
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