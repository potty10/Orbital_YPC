import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Pressable, TextInput, Button, ScrollView } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { useAuthentication, db } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

function Card({ item }) {
  return (
      <View style={cardStyle.container}>
          <Text style={cardStyle.header}>{item?.exerciseName}</Text>         
          <Text>{item?.exerciseRepititions}</Text>
          <Text>{item?.exerciseWeight}</Text>
      </View>
  );
}

// https://reactnavigation.org/docs/5.x/header-buttons/
// Under the section: Header interaction with its screen component
export default function CreateWorkoutPage({ navigation, route }) {
  // const { workoutContent, workoutTitle } = useSelector(state => state.editedWorkout)
  const [workoutTitle, setWorkoutTitle] = useState('');  
  const [ exerciseList, setExerciseList ] = useState([])
  const { user } = useAuthentication()

  //https://stackoverflow.com/questions/70963093/is-there-a-way-to-trigger-usefocuseffect-every-time-the-screen-gets-focused-with
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params?.exerciseName) {
      setExerciseList(oldList => [...oldList, {...route.params}])
      // Set params to null so params are not stored
      // https://reactnavigation.org/docs/params/
      navigation.setParams({
        exerciseName: null,
        exerciseRepititions: null,
        exerciseWeight: null
      });
    }  
  }, [isFocused])

  const addWorkoutToDb = async () => {
    if (exerciseList.length === 0) {
      Alert.alert("Empty workout is not allowed", null, [
        { text: "OK" }
      ])
    } else {
      let newEntry = {
        // workoutTitle: workoutTitle ? workoutTitle : `New Workout (${(new Date()).toLocaleDateString('en-SG')})`,
        workoutTitle: workoutTitle ? workoutTitle : `New Workout`,
        workoutContent: exerciseList,
        userId: user.uid
      };
      try {
        const docRef = await addDoc(collection(db, "user_workouts"), newEntry); 
        Alert.alert("Workout Created", null, [
          { text: "OK", onPress: () => navigation.navigate("Workout List") }
        ])
      } catch (error) {
        console.log(error)
      } 
    }   
  };

  const repeatLastWorkout = () => {
    if (exerciseList.length > 0) {
      setExerciseList(oldList => {
        return [...oldList, {...oldList[oldList.length - 1]}]
      })
    } 
  }

  const deleteLastWorkout = () => {
    setExerciseList(oldList => {
      return oldList.slice(0, -1)
    })
  }
  
  return (
    <View style={styles.container}>
      <TextInput style={{marginBottom: 5, fontSize: 24, marginBottom: 20, marginTop: 20}} placeholder='Workout Title' value={workoutTitle}
        textAlign={'center'} onChangeText={text => setWorkoutTitle(text)} />    
      <ScrollView>
        {exerciseList.map(item => <Card item={item} />)}
        {/* <FlatList data={exerciseList} renderItem={({ item, index }) => (<Card item={item} />)} /> */}
        <View style={styles.buttonStyle}>
        {/* <Button title='New Set'/> */}
        <Button title='Delete' onPress={() => deleteLastWorkout()}/>
        <Button title='Repeat' onPress={() => repeatLastWorkout()}/>
        <Button title='Add New' onPress={() => navigation.navigate("Search Workout")}/>
        
      </View>
      <View style={styles.buttonStyle}>
        <Button title='Cancel' onPress={() => navigation.goBack()}/>
        <Button title='Create' onPress={addWorkoutToDb}/>
      </View>
      </ScrollView>     
    </View>
  );
}

// Display: 'flex' is default
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen instead of just wrapping content
    backgroundColor: '#fff',
    alignItems: "stretch", // Default value, width of items stretch to fit container width
    justifyContent: "flex-start" // Default value
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 5,
  },
  header: {
    marginBottom: 8
  }
});