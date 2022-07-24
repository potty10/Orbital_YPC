import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, Pressable, RefreshControl, ActivityIndicator, Text} from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

// Redux
import { loadAllWorkouts } from '../slices/workoutListSlice';

// Components
import Card, { mapDocumentToUi } from '../components/Card';

export default function ListWorkoutPage({navigation}) {
    const dispatch = useDispatch();
    const { workoutList, isLoading } = useSelector(state => state.workoutList)
    // const [workoutPlans, setWorkoutPlans] = useState([]);
    // const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [isEditingMode, setIsEditingMode] = useState(false)
    const auth = getAuth()

    // Input: Object with workoutContet, workoutTitle
    // Output: Object with mainTitle, subTitle, content
    // const mapDocumentToUi = (document) => {
    //     let content = ""
    //     document.workoutContent.forEach(exercise => {
    //         content = content.concat(`${exercise.exerciseName} x ${exercise.exerciseRepititions} (${exercise.exerciseWeight} kg)\n`)
    //     })
    //     return {
    //         mainTitle: document.workoutTitle,
    //         subTitle: document?.workoutDuration,
    //         content: content
    //     }
    // }

    // let loadAllWorkouts = async () => {
    //     const q = query(collection(db, "user_workouts"), where("userId", "==", auth.currentUser.uid));
    
    //     const querySnapshot = await getDocs(q);
    //     let exerciseList = [];
    //     querySnapshot.forEach((doc) => {
    //       let workoutItem = mapDocumentToUi(doc.data());
    //       exerciseList.push(workoutItem);
    //     });   
    //     setWorkoutPlans(exerciseList);
        
    //     // setIsRefreshing(false);
    // };

    // TODO: Load data from database
    useEffect(() => {
        dispatch(loadAllWorkouts());
        // loadAllWorkouts();
        // setIsLoading(false);
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (        
            <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => setIsEditingMode(isEditingMode => !isEditingMode)} style={{ marginRight: 26 }}>
                    <Text>{isEditingMode? "Done": "Edit"}</Text>
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

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Pressable style={styles.card}><Card item={mapDocumentToUi(item)} /></Pressable>
            {isEditingMode && <Pressable style={styles.deleteButton}><Text>Delete</Text></Pressable>}
        </View>      
    )

    return (
        <View style={styles.container}>
            <Text>{isEditingMode? "editing now": "Not edtiting"}</Text>
            {isLoading ? <ActivityIndicator/> : 
            <FlatList data={workoutList} renderItem={renderItem} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
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
        alignItems: 'center'
    },
    card: {
        flex: 1
    },
    deleteButton: {
        marginHorizontal: 10
    }
});
