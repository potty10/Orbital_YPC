import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import Card from '../common/Card';

// Assets
import BicycleImage from "../../assets/bicycle.png";
import RunningShoesImage from "../../assets/running_shoes.png";
import SwimmerImage from "../../assets/swimmer.png";

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
export default function StartWorkoutPage() {
    const renderItem = ({ item }) => (
        <Pressable><Card item={item}/></Pressable>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aerobic exercises</Text>
            <View style={styles.carousel}>
                <View style={styles.icon}>
                    <Image source={BicycleImage} style={styles.image}/>
                </View>
                <View style={styles.icon}>
                    <Image source={RunningShoesImage} style={styles.image}/>
                </View>
                <View style={styles.icon}>
                    <Image source={SwimmerImage} style={styles.image}/>
                </View>
            </View>
            <Text style={styles.title}>Workout Plans</Text>         
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
    }
});