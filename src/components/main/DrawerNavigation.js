import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../api/firebase';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserCreateWorkout from './UserCreateWorkout';
import UserFeed from './UserFeed';
import UserWorkoutList from './UserWorkoutList';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Create Workout" component={UserCreateWorkout} />
                <Drawer.Screen name="Feed" component={UserFeed} />
            </Drawer.Navigator>
        </NavigationContainer>
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
