import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { useAuthentication } from '../../api/firebase';
import { getAuth } from 'firebase/auth';

export default function UersWorkoutList() {
    const { user } = useAuthentication();
    return (
      <View style={styles.container}>
        <Text>Welcome {user?.email}!</Text>
        <Button title="Sign Out" onPress={() => signOut(auth)} />
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