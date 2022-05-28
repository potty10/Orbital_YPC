import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Welcome({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <StatusBar style="auto" />
            <Button title="Sign in" onPress={() => navigation.navigate('Sign In')} />
            <Button title="Sign up" onPress={() => navigation.navigate('Sign Up')} />
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