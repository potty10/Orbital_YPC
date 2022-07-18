import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, Button, ScrollView } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { useAuthentication, db } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
//import { Searchbar } from 'react-native-paper';

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
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [exerciseList, setExerciseList] = useState([])
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
    let newEntry = {
      workoutTitle: workoutTitle ? workoutTitle : `New Workout (${(new Date()).toLocaleDateString('en-SG')})`,
      workoutContent: exerciseList,
      userId: user.uid
    };
    const docRef = await addDoc(collection(db, "user_workouts"), newEntry); 
    // toDoToSave.id = docRef.id;
    // let updatedToDos = [...toDos];
    // updatedToDos.push(toDoToSave);
    // setToDos(updatedToDos);
  };

  const repeatLastWorkout = () => {
    setExerciseList(oldList => {
      return [...oldList, {...oldList[oldList.length - 1]}]
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
        <Button title='Repeat' onPress={() => repeatLastWorkout()}/>
        <Button title='Add New' onPress={() => navigation.navigate("Search Workout")}/>
        <Button title='New Set'/>
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