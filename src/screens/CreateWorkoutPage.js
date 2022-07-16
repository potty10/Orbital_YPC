import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function CreateWorkoutPage() {
  [searchValue, setSearchValue] = useState('');
  const onChangeSearch = query => setSearchValue(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen instead of just wrapping content
    backgroundColor: '#fff',
    padding: 26,
    alignItems: "stretch", // Default value, width of items stretch to fit container width
    justifyContent: "flex-start" // Default value
  },
});
