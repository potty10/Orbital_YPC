import React, { useState } from 'react';
import {
  Button, View, TextInput, Text, Alert,
} from 'react-native';
import {
  collection, query, where, getDocs, writeBatch,
} from 'firebase/firestore';
import {
  signOut, updatePassword, signInWithEmailAndPassword, deleteUser, getAuth,
} from 'firebase/auth';
import AppStyles from '../styles/AppStyles';
import { useAuthentication, db } from '../../firebase';

export default function ManageAccount({ navigation }) {
  const auth = getAuth();
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const { user } = userCredential;
        updatePassword(user, newPassword).then(() => {
          setNewPassword('');
          setErrorMessage('');
          setCurrentPassword('');
          Alert.alert('Password updated', null, [
            { text: 'OK' },
          ]);
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const deleteUserAccount = async () => {
    if (currentPassword === '') {
      setErrorMessage('Must enter current password to delete account');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword);
      const batch = writeBatch(db);
      ['user_workouts', 'user_history'].forEach(async (collectionName) => {
        const q = query(collection(db, collectionName), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
      });
      batch.commit();
      await deleteUser(auth.currentUser);
      navigation.navigate('Login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Current Password"
        value={currentPassword}
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="New Password"
        value={newPassword}
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <Button title="Update Password" onPress={updateUserPassword} />
      <Button title="Delete User" onPress={deleteUserAccount} />
      <Button title="Logout" onPress={() => { signOut(auth); }} />
    </View>
  );
}
