import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import UserFeedPage from './src/components/main/UserFeedPage';
import CreateWorkoutPage from './src/components/main/CreateWorkoutPage';
import ListWorkoutPage from './src/components/main/ListWorkoutPage';
import StartWorkoutPage from './src/components/main/StartWorkoutPage';
import CommunitiesPage from './src/components/communities/CommunitiesPage'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Feed">
        <Drawer.Screen name="Feed" component={UserFeedPage} />
        <Drawer.Screen name="Communities" component={CommunitiesPage} />
        <Drawer.Screen name="Workout Plans" children={() => (
          <Stack.Navigator>
            <Stack.Screen name="Workout List" component={ListWorkoutPage} options={{ title: 'Workout Plans' }}/>
            <Stack.Screen name="Create Workout" component={CreateWorkoutPage} />
          </Stack.Navigator>
        )}/>
        <Drawer.Screen name="Start Workout" component={StartWorkoutPage} />
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
