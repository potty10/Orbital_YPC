import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';

export default function MainWorkoutPage() {
  return (
    <View style={styles.container}>
      <Text>Main Workout Page</Text>
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
