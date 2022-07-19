// Navigation
// https://reactnavigation.org/docs/stack-navigator/
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

// Screens
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ManageAccount from './src/screens/ManageAccount';
import ResetPassword from './src/screens/ResetPassword';
import ToDo from './src/screens/ToDo';
import UserFeedPage from './src/screens/UserFeedPage';
import ListWorkoutPage from './src/screens/ListWorkoutPage';
import CreateWorkoutPage from './src/screens/CreateWorkoutPage';
import StartWorkoutPage from './src/screens/StartWorkoutPage';
import SearchWorkoutPage from './src/screens/SearchWorkoutPage';
import WorkoutTimerPage from './src/screens/timer/WorkoutTimerPage';
import WorkoutSummaryPage from './src/screens/WorkoutSummaryPage';


// Firebase
import { useAuthentication } from './firebase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// There are 2 ways to nest navigators and hide parent header
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
// https://reactnavigation.org/docs/screen-options-resolution (Setting parent screen options based on child navigator's state)
export default function App() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Workout Main"  options={{ headerShown: false }} children={() => (
            <Drawer.Navigator initialRouteName="Feed">
            <Drawer.Screen name="Feed" component={UserFeedPage} />
            <Drawer.Screen
              name="Workout List"
              component={ListWorkoutPage}
              options={({ navigation }) => ({
                title: 'Workout Plans',
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate('Create Workout')}>
                    <Text>Create</Text>
                  </Pressable>
                ),
              })} />
            {/* <Drawer.Screen name="Workout List" component={ListWorkoutPage} /> */}          
            <Drawer.Screen name="Start Workout" component={StartWorkoutPage} />
            <Drawer.Screen name="ToDo" component={ToDo} />
            <Drawer.Screen name="ManageAccount" component={ManageAccount} />
          </Drawer.Navigator>
          )}/>         
          <Stack.Screen name="Create Workout" component={CreateWorkoutPage} />
          <Stack.Screen name="Search Workout" component={SearchWorkoutPage} />
          <Stack.Screen name="Timer Workout" component={WorkoutTimerPage} />
          <Stack.Screen name="Workout Summary" component={WorkoutSummaryPage} />
        </Stack.Navigator>

      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
      )
      }

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
