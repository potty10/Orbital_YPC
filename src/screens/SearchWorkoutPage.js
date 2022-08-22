import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, Pressable, TextInput, Button,
} from 'react-native';
import { FAB, Icon } from '@rneui/themed';

const completeWorkoutList = [
  {
    mainTitle: 'Arnold Press (Dumbbell)',
  },
  {
    mainTitle: 'Back extension (Machine)',
  },
  {
    mainTitle: 'Barbell Row',
  },
  {
    mainTitle: 'Bench Press',
  },
  {
    mainTitle: 'Bent Over One Arm Row (Dumbbell)',
  },
  {
    mainTitle: 'Bent Over Row',
  },
  {
    mainTitle: 'Bicep Curl',
  },
  {
    mainTitle: 'Deadlift',
  },
  {
    mainTitle: 'Hammer Curl',
  },
  {
    mainTitle: 'Pushups',
  },
  {
    mainTitle: 'Romanian Deadlift',
  },
  {
    mainTitle: 'Squats',
  },
].map((item) => ({ ...item, lowerCase: item.mainTitle.toLowerCase() }));

// item is an object with property mainTitle
// function CardFeed({ item }) {
//   return (

//   );
// }

// Type prop refers to name of a collection of icons: 'material', 'material-community'...
// The full list is here: https://reactnativeelements.com/docs/1.2.0/icon#available-icon-sets
function Counter({ counterValue, setCounterValue }) {
  const changeValue = (newValue) => {
    if (newValue > 0) setCounterValue(newValue);
  };

  return (
    <View style={counterStyle.container}>
      <Pressable style={counterStyle.button} onPress={() => changeValue(counterValue - 1)}>
        <Icon name="minus" type="material-community" />
      </Pressable>
      <Text>{counterValue}</Text>
      <Pressable style={counterStyle.button} onPress={() => changeValue(counterValue + 1)}>
        <Icon name="plus" type="material-community" />
      </Pressable>
    </View>
  );
}

// https://reactnavigation.org/docs/5.x/header-buttons/
// Under the section: Header interaction with its screen component
export default function SearchWorkoutPage({ navigation, route }) {
  const [selectedValueIndex, setSelectedValueIndex] = useState();
  const [searchResult, setSearchResult] = useState(completeWorkoutList);
  const [exerciseCount, setExerciseCount] = useState(1);
  const [exerciseWeight, setExerciseWeight] = useState(1);

  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => setSelectedValueIndex(index)}>
      {index === selectedValueIndex ? (
        <View style={[cardStyle.container, cardStyle.selected]}>
          <Text style={[cardStyle.header]}>{item?.mainTitle}</Text>
          <View>
            <View style={cardStyle.row}>
              <Text>{'Weight (kg): '}</Text>
              <Counter counterValue={exerciseWeight} setCounterValue={setExerciseWeight} />
            </View>
            <View style={cardStyle.row}>
              <Text>Reps: </Text>
              <Counter counterValue={exerciseCount} setCounterValue={setExerciseCount} />
            </View>
          </View>
        </View>
      ) : (
        <View style={cardStyle.container}>
          <Text>{item?.mainTitle}</Text>
        </View>
      )}
    </Pressable>
  );

  const searchWorkoutList = (searchValue) => {
    setSelectedValueIndex(null);
    const searchValueLower = searchValue.toLowerCase();
    const newSearchResult = [];
    completeWorkoutList.forEach((item, index) => {
      if (item.lowerCase.includes(searchValueLower)) newSearchResult.push(item);
    });
    setSearchResult(newSearchResult);
  };

  const addToWorkoutPlan = () => {
    if (selectedValueIndex != null) {
      navigation.navigate('Create Workout', {
        exerciseName: searchResult[selectedValueIndex].mainTitle,
        exerciseRepititions: exerciseCount,
        exerciseWeight,
      });
    } else {
      alert('Nothing is selected');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." onChangeText={(text) => searchWorkoutList(text)} />
      <FlatList data={searchResult} renderItem={renderItem} />
      <FAB
        disabled={false}
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        onPress={addToWorkoutPlan}
      />
    </View>
  );
}

// Display: 'flex' is default
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen instead of just wrapping content
    backgroundColor: '#fff',
    padding: 26,
    alignItems: 'stretch', // Default value, width of items stretch to fit container width
    justifyContent: 'flex-start', // Default value
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
    alignItems: 'flex-start',
  },
  selected: {
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 3,
    shadowOpacity: 0.8,
    // elevation property for Android
    // https://stackoverflow.com/questions/44908580/react-native-shadow-not-appearing
    elevation: 10,
    borderColor: 'blue',
  },
  header: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 7,
  },
});

const counterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 8,
  },
});
