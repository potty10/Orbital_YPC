import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, Button } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { useAuthentication } from '../../firebase';
//import { Searchbar } from 'react-native-paper';

const dummyWorkoutData = [
    "Bench Press",
    "Squats",
    "Deadlift",
    "Barbell Row",
    'Romanian Deadlift',
    "Bicep Curl",
    "Dumbbell Press",
    "Shoulder Press"
]

const workoutDummyData = [
  {
    mainTitle: "Bench Press"
  },
  {
    mainTitle: "Squats",
  },
  {
    mainTitle: "Deadlift",
  },
  {
    mainTitle: "Barbell Row",
  },
  {
    mainTitle: 'Romanian Deadlift',
  },
  {
    mainTitle: "Bicep Curl",
  },
]



function CardFeed({ item }) {
  return (
      <View style={cardStyle.container}>
          <Text>{item?.mainTitle}</Text>         
      </View>
  );
}

// https://reactnavigation.org/docs/5.x/header-buttons/
// Under the section: Header interaction with its screen component
export default function SearchWorkoutPage({ navigation }) {
  const [searchValue, setSearchValue] = useState();
  const { user } = useAuthentication()

  const renderItem = ({ item, index }) => (
    <CardFeed item={item} />
  )

  return (
    <View style={styles.container}>
      <TextInput placeholder='Search...' value={searchValue}
        onChangeText={text => setSearchValue(searchValue)} />
      <FlatList data={workoutDummyData} renderItem={renderItem} />    
    </View>
  );
}

// Display: 'flex' is default
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen instead of just wrapping content
    backgroundColor: '#fff',
    padding: 26,
    alignItems: "stretch", // Default value, width of items stretch to fit container width
    justifyContent: "flex-start" // Default value
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    marginVertical: 5,
  },
});