import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function UserCreateWorkout() {
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});