import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Drawer
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Pages
import UserFeedPage from './src/components/main/UserFeedPage';
import ListWorkoutPage from './src/components/main/ListWorkoutPage';
import StartWorkoutPage from './src/components/main/StartWorkoutPage';
import CommunitiesPage from './src/components/communities/CommunitiesPage'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Feed">
        <Drawer.Screen name="Feed" component={UserFeedPage} />
        <Drawer.Screen name="Communities" component={CommunitiesPage} />
        <Drawer.Screen name="Workout Plans" component={ListWorkoutPage} />
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
