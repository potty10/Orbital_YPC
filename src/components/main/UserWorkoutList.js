import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import Card from '../common/Card';

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
    }
];
export default function UserWorkoutList() {
    const renderItem = ({ item }) => {
        <Pressable><Card item={item} /></Pressable>
    }
    return (
        <View style={styles.container}>
            <Text>Aerobic exercises</Text>
            <View style={[styles.container, { flexDirection: 'row' }]}>
                <View style={styles.icon}></View>
                <View style={styles.icon}></View>
                <View style={styles.icon}></View>
            </View>
            <Text>Workout Plans</Text>
            <FlatList data={workoutPlans} renderItem = {renderItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: '84dp',
        wdith: '84dp',
        borderRadius: 30,
        backgroundColor: '#D9D9D9'
    }
});