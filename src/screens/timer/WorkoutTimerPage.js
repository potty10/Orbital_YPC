import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Button } from 'react-native';
import { secondToHHMMSS } from '../../utils/DateTimeUtil';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { setCurrentWorkout } from '../../slices/currentWorkoutSlice'
import { mapDocumentToUi } from '../../components/Card';

export default function WorkoutTimerPage({ navigation }) {
  const dispatch = useDispatch();
  const currentWorkout = useSelector(state => state.currentWorkout)
  const { mainTitle, content } = mapDocumentToUi(currentWorkout)

  // const [timeState, setTimeState] = useState({
  //   startTime: null, 
  //   elapsedSeconds: 0,// Duration between startTime and current time
  //   totalSeconds: 0,
  //   isActive: false,
  //   intervalId: null
  // })
  const [elapsedSeconds, setElapsedSeconds] = useState(0); // Duration between startTime and current time
  const [totalSeconds, setTotalSeconds] = useState(0) // Total seconds before the latest start
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null) // Time of latest start
  const [intervalId, setIntervalId] = useState()
  let interval = null; // Id of setInterval

  // let getStartTime = () => {
  //   return startTime
  // }

  const toggle = () => {
    //Pause
    // if (timeState.isActive) {

    // }
    // if (isActive) {
    //   console.log("-----Pause")
    //   console.log("StartTime: ", startTime)
    //   setTotalSeconds(start => start + elapsedSeconds)
    //   clearInterval(interval)
    //   setElapsedSeconds(0)
    // } else { // resume   
    //   console.log("-----resume")
    //   console.log("Currnt time: ", new Date())
    //   setStartTime(new Date())
    //   console.log("New startTime:", startTime)
    //   interval = setInterval(()=> {
    //     console.log("Current time", new Date())
    //     console.log(startTime)
    //     setElapsedSeconds(() => ( new Date() - getStartTime()) / 1000);
    //   }, 1000);
    // }
    setIsActive(!isActive);
  }

  const reset = () => {
    console.log("-----reset")
    setIsActive(false)
    setElapsedSeconds(0); 
    setTotalSeconds(0)
    clearInterval(intervalId)
  }

  const completeWorkout = useCallback(() => {
    console.log("-----Saving")
    console.log("Total seconds", totalSeconds)
    console.log("elapsedSeconds", elapsedSeconds)
    setIsActive(false)
    dispatch(setCurrentWorkout({ workoutDuration: totalSeconds + elapsedSeconds }))
    navigation.navigate('Workout Summary')
  }, [totalSeconds, elapsedSeconds])
  // const completeWorkout = () => {
  //   setIsActive(false)
  //   console.log("-----Saving")
  //   console.log("Total seconds", totalSeconds)
  //   console.log("elapsedSeconds", elapsedSeconds)
  //   dispatch(setCurrentWorkout({workoutDuration: totalSeconds + elapsedSeconds}))
  //   navigation.navigate('Workout Summary')
  // }

  // useEffect(() => {
  //   return () => clearInterval(interval)
  // })

  useEffect(() => {
    // Start
    if (isActive) {
      const newStartTime = new Date()
      interval = setInterval(() => {
        setElapsedSeconds((new Date() - newStartTime) / 1000);
      }, 1000);
      setIntervalId(interval)
      // Pause or reset
    } else if (!isActive) {
      console.log("total seconds", totalSeconds)
      console.log("Elapsed seconds", elapsedSeconds)
      clearInterval(interval);
      setTotalSeconds(start => start + elapsedSeconds)
      setElapsedSeconds(0)
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={completeWorkout} style={{ marginRight: 26 }}>
          <Text>Done</Text>
        </Pressable>
      ),
    });
  }, [navigation, startTime, elapsedSeconds])

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

  let workoutDuration = totalSeconds + elapsedSeconds

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, padding: 30, alignItems: 'center' }}>
        <Text>{mainTitle}</Text>
        <Text>{content}</Text>
      </View>
      <View style={{ flex: 3, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Text style={styles.timerText}>{secondToHHMMSS(workoutDuration)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggle} style={styles.button}>
            <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
            <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            console.log("-----Saving")
            console.log("Total seconds", totalSeconds)
            console.log("elapsedSeconds", elapsedSeconds)
            setIsActive(false)
            dispatch(setCurrentWorkout({ workoutDuration: workoutDuration }))
            navigation.navigate('Workout Summary')
          }} style={[styles.button, styles.buttonReset]}>
            <Text style={[styles.buttonText, styles.buttonTextReset]}>Done</Text>
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
