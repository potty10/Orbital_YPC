import React from 'react';
import {
  StyleSheet, View, FlatList, Pressable, Text, Alert,
} from 'react-native';

export default function SimpleCard({ item, style }) {
  return (
    <View style={[cardStyle.container, style]}>
      <Text style={cardStyle.header}>{item?.exerciseName}</Text>
      <Text>{item?.exerciseRepititions && `${item?.exerciseRepititions} reps`}</Text>
      <Text>{item?.exerciseWeight && `${item?.exerciseWeight} kg`}</Text>
    </View>
  );
}

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 5,
  },
  header: {
    marginBottom: 8,
  },
});
