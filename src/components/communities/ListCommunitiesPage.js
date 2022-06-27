import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// Firebase
import { useAuthentication } from '../../api/firebase';
import { signOut, getAuth } from 'firebase/auth';

export default function ListCommunitiesPage() {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button title="Sign Out" onPress={() => signOut(getAuth())} />
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