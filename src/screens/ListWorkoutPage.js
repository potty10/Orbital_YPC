import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable, RefreshControl, ActivityIndicator, Text, Alert } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loadAllWorkouts, deleteWorkoutById } from '../slices/workoutListSlice';
import { setEditedWorkout, clearEditedWorkout } from '../slices/editedWorkoutSlice';

// Components
import Card, { mapDocumentToUi } from '../components/Card';

export default function ListWorkoutPage({ navigation }) {  
    const dispatch = useDispatch();
    const { workoutList, isLoading } = useSelector(state => state.workoutList)
    const { workoutContent, workoutTitle, workoutId } = useSelector(state => state.editedWorkout)
    const [refreshing, setRefreshing] = useState(false)
    const [isEditingMode, setIsEditingMode] = useState(false)
    

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && workoutId) {
            dispatch(clearEditedWorkout())
        }  
    }, [isFocused])

    useEffect(() => {
        dispatch(loadAllWorkouts());
        // loadAllWorkouts();
        // setIsLoading(false);
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={() => setIsEditingMode(isEditingMode => !isEditingMode)} style={{ marginRight: 26 }}>
                        <Text>{isEditingMode ? "Done" : "Edit"}</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('Create Workout')} style={{ marginRight: 26 }}>
                        <Text>Create</Text>
                    </Pressable>
                </View>
            ),
        });
    }, [navigation, isEditingMode])

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        // loadAllWorkouts()
        dispatch(loadAllWorkouts());
        setRefreshing(false)
    })

    const deleteWorkout = (workoutId) => {
        Alert.alert("Are you sure?", "This workout will be permanently deleted!", [
            {
                text: "Cancel",
                style: "cancel",
            },
            { text: "OK", onPress: () => dispatch(deleteWorkoutById(workoutId)) }
        ])
    }

    const editWorkout = (workoutItem) => {
        dispatch(setEditedWorkout(workoutItem))
        navigation.navigate('Create Workout')       
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Pressable style={styles.card}><Card item={mapDocumentToUi(item)} /></Pressable>
            {isEditingMode &&
                <>
                    <Pressable onPress={() => deleteWorkout(item.workoutId)} style={styles.deleteButton}>
                        <Text>Delete</Text>
                    </Pressable>
                    <Pressable onPress={() => editWorkout(item)} style={styles.editButton}>
                        <Text>Edit</Text>
                    </Pressable>
               </>
            }
        </View>
    )

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> :
                <FlatList data={workoutList} renderItem={renderItem} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    item: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    card: {
        flex: 4
    },
    deleteButton: {
        paddingHorizontal: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        flex: 1
    },
    editButton: {
        paddingHorizontal: 10,
        backgroundColor: '#71a3f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        flex: 1
    }
});
