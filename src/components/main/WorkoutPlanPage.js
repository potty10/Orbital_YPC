import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import ListWorkoutPage from './ListWorkoutPage';
import CreateWorkoutPage from './CreateWorkoutPage';

const Stack = createStackNavigator();

export default function WorkoutPlanPage() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Workout Plans" component={ListWorkoutPage} />
            <Stack.Screen name="Create Workout" component={CreateWorkoutPage} />
        </Stack.Navigator>
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
