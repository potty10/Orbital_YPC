import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, Dimensions, Pressable, Button } from 'react-native';
import { secondToHHMMSS } from '../../utils/DateTimeUtil';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {setCurrentWorkout} from '../../slices/currentWorkoutSlice'
import { mapDocumentToUi } from '../../components/Card';

export default function WorkoutTimerPage({ navigation }) {
  const dispatch = useDispatch();
  const currentWorkout = useSelector(state => state.currentWorkout)
  const {mainTitle, content} = mapDocumentToUi(currentWorkout)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null)
  let interval = null; // Id of setInterval

  const toggle = () => {
    if (!isActive) setStartTime(new Date());
    else setStartTime(null);
    setIsActive(!isActive);
  }

  const reset = () => {
    setElapsedSeconds(0);
    
  }

  const completeWorkout = () => {
    dispatch(setCurrentWorkout({workoutDuration: elapsedSeconds}))
    navigation.navigate('Workout Summary')
  }

  useEffect(() => {
    
    if (isActive) {
      interval = setInterval(()=> {
        setElapsedSeconds(( new Date() - startTime) / 1000);
      }, 1000);
    } else if (!isActive && elapsedSeconds !== 0) {
      setStartTime(null)
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={completeWorkout} style={{ marginRight: 26 }}>
          <Text>Done</Text>
        </Pressable>
      ),
    });
  }, [navigation])

  // When screen focuses
  // const isFocused = useIsFocused();
  // useEffect(() => {  
  //   if (startTime) {
  //     clearInterval(interval);
  //     setElapsedSeconds((new Date() - startTime) / 1000)
  //     interval = setInterval(()=> {
  //       setElapsedSeconds(elapsedSeconds => elapsedSeconds + 1);
  //     }, 1000);
  //   }
  // }, [isFocused])

  return (
    <View style={styles.container}>
      <View style={{flex: 2, padding: 30, alignItems: 'center'}}>
        <Text>{mainTitle}</Text>
        <Text>{content}</Text>
      </View>
      <View style={{flex: 3, justifyContent: 'space-evenly', alignItems: 'center'}}>
      <Text style={styles.timerText}>{secondToHHMMSS(elapsedSeconds)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
            <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
            <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      
      {/* <Pressable onPress={completeWorkout}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Done</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "flex-start" // Default value
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
      borderWidth: 10,
      borderColor: '#B9AAFF',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
  }, 
  buttonText: {
      fontSize: 45,
      color: '#B9AAFF'
  },
  timerText: {
      fontSize: 60,
      marginBottom: 20
  },
  buttonReset: {
      borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  }
});
