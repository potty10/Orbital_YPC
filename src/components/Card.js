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
      <Text>{item?.content}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 143,
    padding: 22.
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8
  }
});