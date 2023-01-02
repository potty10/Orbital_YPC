// Navigation
// https://reactnavigation.org/docs/stack-navigator/
// react-native-gesture-handler must be imported at the top
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// React
import React from 'react';
import { LogBox } from 'react-native';

// Theme
import { ThemeProvider, useTheme } from '@rneui/themed';
import mainTheme from './src/styles/MainTheme';

// Redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import currentWorkoutReducer from './src/slices/currentWorkoutSlice';
import workoutListReducer from './src/slices/workoutListSlice';
import editedWorkoutReducer from './src/slices/editedWorkoutSlice';

// Screens
import Login from './src/screens/auth/LoginPage';
import SignUp from './src/screens/auth/SignUpPage';
import ManageAccount from './src/screens/ManageAccount';
import ResetPassword from './src/screens/auth/ResetPassword';
import UserFeedPage from './src/screens/UserFeedPage';
import ListWorkoutPage from './src/screens/ListWorkoutPage';
import CreateWorkoutPage from './src/screens/CreateWorkoutPage';
import StartWorkoutPage from './src/screens/StartWorkoutPage';
import SearchWorkoutPage from './src/screens/SearchWorkoutPage';
import WorkoutTimerPage from './src/screens/WorkoutTimerPage';
import WorkoutSummaryPage from './src/screens/WorkoutSummaryPage';

// Firebase
import { useAuthentication } from './firebase';

// Ignore log notification by message
// LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications
// LogBox.ignoreAllLogs();

export const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    workoutList: workoutListReducer,
    editedWorkout: editedWorkoutReducer,
  },
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator screenOptions={{headerStyle: { backgroundColor: theme.colors.primary}}}>
      <Drawer.Screen name="Feed" component={UserFeedPage} />
      {/* <Drawer.Screen
      name="Workout List"
      component={ListWorkoutPage}
      options={({ navigation }) => ({
        title: 'Workout Plans',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Create Workout')} style={{ marginRight: 26 }}>
            <Text>Create</Text>
          </Pressable>
        ),
      })} /> */}
      <Drawer.Screen name="Workout List" component={ListWorkoutPage} />
      <Drawer.Screen name="Start Workout" component={StartWorkoutPage} />
      <Drawer.Screen name="Manage Account" component={ManageAccount} />
    </Drawer.Navigator>
  );
}

function MainStack() {
  const { theme } = useTheme();
  return (
    <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: theme.colors.primary}}}>
      <Stack.Screen name="Workout Main" component={HomeDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Create Workout" component={CreateWorkoutPage} />
      <Stack.Screen name="Search Workout" component={SearchWorkoutPage} />
      <Stack.Screen name="Timer Workout" component={WorkoutTimerPage} />
      <Stack.Screen name="Workout Summary" component={WorkoutSummaryPage} />
    </Stack.Navigator>
  )
}
// There are 2 ways to nest navigators and hide parent header
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
// https://reactnavigation.org/docs/screen-options-resolution (Setting parent screen options based on child navigator's state)
export default function App() {
  const { user } = useAuthentication();

  return (   
      <Provider store={store}>
        <NavigationContainer>
          {user ? (      
            <ThemeProvider theme={mainTheme}> 
                <MainStack/>
            </ThemeProvider>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </Provider>
    
  );
}
