// Navigation
// https://reactnavigation.org/docs/stack-navigator/
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { StyleSheet, Text, View } from 'react-native';

// Screens
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ManageAccount from './src/screens/ManageAccount';
import ResetPassword from './src/screens/ResetPassword';
import ToDo from './src/screens/ToDo';
import UserFeedPage from './src/screens/UserFeedPage';
import ListWorkoutPage from './src/screens/ListWorkoutPage';

// Firebase
import { useAuthentication } from './firebase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      { user ? (
          <Drawer.Navigator initialRouteName="Feed">
            <Drawer.Screen name="Feed" component={UserFeedPage} />
            <Drawer.Screen name="Workout List" component={ListWorkoutPage} options={{ title: 'Workout Plans' }}/>
            <Drawer.Screen name="ToDo" component={ToDo}/>
            
            <Drawer.Screen
              name="ManageAccount"
              component={ManageAccount}/>            
          </Drawer.Navigator>
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
