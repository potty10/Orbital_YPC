import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Card({item}) {
  return (
    <View style={styles.container}>
        <View style={[styles.container, {flexDirection: 'row', justifyContent: 'space-between'}]}>
            <Text>{item?.mainTitle}</Text>
            <Text>{item?.subTitle}</Text>
            <Image source={require('../assets/clock.png')} />
        </View>
      <Text>{item?.content}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});