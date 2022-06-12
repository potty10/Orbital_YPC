import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Firebase
import { useAuthentication } from '../../api/firebase';

// Pages
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Welcome from '../auth/Welcome';
import ListCommunitiesPage from './ListCommunitiesPage';


const Stack = createStackNavigator();

export default function App() {
    const { user } = useAuthentication();
    return (
        user ? (
            <ListCommunitiesPage />
        ) : (
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Sign In" component={SignIn} />
                <Stack.Screen name="Sign Up" component={SignUp} />
            </Stack.Navigator>
        )
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
