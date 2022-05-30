import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CardFeed({ item }) {
    return (
        <View style={styles.container}>
            <Text>{item?.mainTitle}</Text>
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