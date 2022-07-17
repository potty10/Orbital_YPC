import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, TextInput, Button } from 'react-native';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
//import { Searchbar } from 'react-native-paper';

// const completeWorkoutList = [
//     "Bench Press",
//     "Squats",
//     "Deadlift",
//     "Barbell Row",
//     'Romanian Deadlift',
//     "Bicep Curl",
//     "Dumbbell Press",
//     "Shoulder Press"
// ]

const completeWorkoutList = [
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
].map(item => ({ ...item , lowerCase: item.mainTitle.toLowerCase()}))


// item is an object with property mainTitle
// function CardFeed({ item }) {
//   return (
      
//   );
// }

// https://reactnavigation.org/docs/5.x/header-buttons/
// Under the section: Header interaction with its screen component
export default function SearchWorkoutPage({ navigation }) {

  const [selectedValue, setSelectedValue] = useState()
  const [searchResult, setSearchResult] = useState(completeWorkoutList)

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => setSelectedValue(item)}>
      <View style={cardStyle.container}>
          <Text>{item?.mainTitle}</Text>         
      </View>
    </Pressable>
  )

  const searchWorkoutList = (searchValue) => {
    const searchValueLower = searchValue.toLowerCase()
    const newSearchResult = []
    completeWorkoutList.forEach((item, index) => {
      if (item.lowerCase.includes(searchValueLower)) newSearchResult.push(item)
    })
    setSearchResult(newSearchResult)
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Search...' onChangeText={text => searchWorkoutList(text)} />
      <FlatList data={searchResult} renderItem={renderItem} />    
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