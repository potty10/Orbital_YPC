import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

// Assets
import clockImage from "../assets/clock.png";

// By default, the width of Card depends on the alignItems property of the flex parent container 
export default function Card({style, item}) {
  return (
    <View style={[styles.container, style]}>
        <View style={styles.header}>
            <Text>{item?.mainTitle}</Text>
            <Text>{item?.subTitle}</Text>
            <Image source={clockImage} style={{height: 20, width: 20}}/>
        </View>
        <View style={styles.content}>
          <Text numberOfLines={4}>{item?.content}</Text>
        </View>
    </View>
  );
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