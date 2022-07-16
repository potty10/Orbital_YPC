import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';

const userFeedDummyData = [
    {
        mainTitle: "Training 49",
        content: "Ran 40 miles yesterday"
    },
    {
        mainTitle: "Training 48",
        content: "Ran 35 miles yesterday"
    },
    {
        mainTitle: "Training 47",
        content: "Ran 35 miles yesterday"
    },
    {
        mainTitle: "Training 46",
        content: "Ran 35 miles yesterday"
    },
    {
        mainTitle: "Training 45",
        content: "Ran 35 miles yesterday"
    },
    {
        mainTitle: "Training 44",
        content: "Ran 35 miles yesterday"
    },
    {
        mainTitle: "Training 43",
        content: "Ran 35 miles yesterday"
    }
];

function CardFeed({ item }) {
    return (
        <View style={cardStyle.container}>
            <Text style={cardStyle.header}>{item?.mainTitle}</Text>         
            <Text>{item?.content}</Text>
        </View>
    );
}

export default function UserFeedPage() {
    const renderItem = ({ item, index }) => (
        <CardFeed item={item} />
    )
    return (
        <View style={styles.container}>
            {/* <Text>A week at a glance</Text>             */}
            <FlatList data={userFeedDummyData} renderItem = {renderItem}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
        alignItems: "stretch", // Default value, width of items stretch to fit container width
        justifyContent: "flex-start" // Default value
    },
});

const cardStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 143,
        padding: 22,
        marginVertical: 10,
    },
    header: {
        marginBottom: 8
    }
});