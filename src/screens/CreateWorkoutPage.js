import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, Button, ScrollView } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { useAuthentication } from '../../firebase';
//import { Searchbar } from 'react-native-paper';

const workoutDummyData = [
  {
    mainTitle: "Set 1",
    content: "Ran 40 miles yesterday"
  },
  {
    mainTitle: "Set 2",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 3",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 4",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 5",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
  {
    mainTitle: "Set 6",
    content: "Ran 35 miles yesterday"
  },
]

function Card({ item }) {
  return (
      <View style={cardStyle.container}>
          <Text style={cardStyle.header}>{item?.mainTitle}</Text>         
          <Text>{item?.content}</Text>
      </View>
  );
}

// https://reactnavigation.org/docs/5.x/header-buttons/
// Under the section: Header interaction with its screen component
export default function CreateWorkoutPage({ navigation }) {
  const [workoutTitle, setWorkoutTitle] = useState();
  const [exerciseList, setExerciseList] = useState([])
  const { user } = useAuthentication()

  let addToDo = async (todo) => {
    let toDoToSave = {
      text: todo,
      completed: false,
      userId: user.uid
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave); 
    toDoToSave.id = docRef.id;
    let updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);
    setToDos(updatedToDos);
  };

  const renderItem = ({ item, index }) => (
    <Card item={item} />
  )

  return (
    <View style={styles.container}>
      <TextInput style={{marginBottom: 5, fontSize: 24, marginBottom: 20, marginTop: 20}} placeholder='Workout Title' value={workoutTitle}
        textAlign={'center'} onChangeText={text => setWorkoutTitle(text)} />    
      <ScrollView>
        {exerciseList.map(item => <Card item={item} />)}
        {/* <FlatList data={workoutDummyData} renderItem={renderItem} /> */}
        <View style={styles.buttonStyle}>
        <Button title='Repeat'/>
        <Button title='Add New'/>
        <Button title='New Set'/>
      </View>
      <View style={styles.buttonStyle}>
        <Button title='Cancel'/>
        <Button title='Create'/>
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