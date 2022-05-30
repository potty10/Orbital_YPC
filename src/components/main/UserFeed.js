import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import CardFeed from '../common/CardFeed';

const userFeedDummyData = [
    {
        mainTitle: "Arnold Schwarzneggar",
        content: "Ran 40 miles yesterday"
    },
    {
        mainTitle: "Frank Zane",
        content: "At food yesterday"
    }
];
export default function UserFeed() {
    const renderItem = ({ item }) => {
        <Pressable><CardFeed item={item} /></Pressable>
    }
    return (
        <View style={styles.container}>
            <Text>A week at a glance</Text>            
            <FlatList data={userFeedDummyData} renderItem = {renderItem}/>
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