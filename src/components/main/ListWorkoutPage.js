import React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import Card from '../common/Card';

const workoutPlans = [
    {
        id: 1,
        mainTitle: "HIIT 1",
        subTitle: "30 Minutes",
        content: "40 Burpees"
    },
    {
        id: 2,
        mainTitle: "Back day",
        subTitle: "1 Hour",
        content: "5x5 Deadlifts\n 3x8 Lat Pulldowns"
    }
];
export default function ListWorkoutPage() {
    const renderItem = ({ item }) => (
        <Pressable><Card style={styles.card} item={item}/></Pressable>
    )
    return (
        <View style={styles.container}>     
            <FlatList data={workoutPlans} renderItem = {renderItem}/>
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