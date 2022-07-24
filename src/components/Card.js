import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

// Assets
import clockImage from "../assets/clock.png";

// Utilities
import { msToTime } from '../utils/DateTimeUtil';

// By default, the width of Card depends on the alignItems property of the flex parent container 
export default function Card({style, item}) {
  return (
    <View style={[styles.container, style]}>
        <View style={styles.header}>
            <Text>{item?.mainTitle}</Text>
            {item.subTitle && (
              <View style={{flexDirection: 'row'}}>
                <Text>{item?.subTitle}</Text>
                <Image source={clockImage} style={{height: 20, width: 20, marginLeft: 10}}/>
              </View>            
            )}           
        </View>
        <View style={styles.content}>
          <Text numberOfLines={4}>{item?.content}</Text>
        </View>
    </View>
  );
}

// A mapping function specifically for this Card
export const mapDocumentToUi = (document) => {
  let content = ""
  document.workoutContent.forEach(exercise => {
      if (exercise.exerciseRepititions && exercise.exerciseWeight)
      content = content.concat(`${exercise.exerciseName} x ${exercise.exerciseRepititions} (${exercise.exerciseWeight} kg)\n`)
      else
      content = content.concat(`${exercise.exerciseName}\n`)
  })
  return {
      mainTitle: document.workoutTitle,
      subTitle: document.workoutDuration >= 0 && msToTime(document.workoutDuration),
      content: content
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 143,
    padding: 22,
    flex: 1
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8
  },
  // Text model does not follow the box model
  // Hence we need to wrap in a view with flex: 1
  // https://stackoverflow.com/questions/71394789/react-native-text-component-overflows-parent-when-inside-with-another-view
  content: {
    flex: 1,
  }
});