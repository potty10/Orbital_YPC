import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { secondToHHMMSS } from '../../utils/DateTimeUtil';
import { useIsFocused } from '@react-navigation/native';

const screen = Dimensions.get('window');

export default function WorkoutTimerPage({ navigation }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null)

  const toggle = () => {
    if (!isActive) setStartTime(new Date());
    else setStartTime(null);
    setIsActive(!isActive);
  }

  const reset = () => {
    setElapsedSeconds(0);
    setIsActive(false);
  }

  
  useEffect(() => {
    let interval = null;
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
      <Text style={styles.timerText}>{secondToHHMMSS(elapsedSeconds)}</Text>
      <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={[styles.button, styles.buttonReset]}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>Reset</Text>
      </TouchableOpacity>
      <Pressable onPress={() => {navigation.navigate('Workout Summary')}}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07121B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderWidth: 10,
      borderColor: '#B9AAFF',
      width: screen.width / 2,
      height: screen.width / 2,
      borderRadius: screen.width / 2,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontSize: 45,
      color: '#B9AAFF'
  },
  timerText: {
      color: '#fff',
      fontSize: 90,
      marginBottom: 20
  },
  buttonReset: {
      marginTop: 20,
      borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  }
});
