import React, { useState } from 'react';
import {
  Button, View, TextInput, Text, Alert, Modal, Pressable, StyleSheet
} from 'react-native';
import {
  collection, query, where, getDocs, writeBatch,
} from 'firebase/firestore';
import {
  signOut, updatePassword, signInWithEmailAndPassword, deleteUser, getAuth,
} from 'firebase/auth';
import { db } from '../../firebase';

export default function ManageAccount({ navigation }) {
  const auth = getAuth();
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const updateUserPassword = async () => {
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
    <View style={styles.mainContainer}>
      <Modal
        animationType="slide"
        visible={updateModalVisible}
        transparent={true}
        onRequestClose={() => {
          setUpdateModalVisible(!updateModalVisible);
        }}
      >
        <View style={styles.modalStyle}>
          <Text style={styles.textStyle}>Update Password</Text>
          <Text style={{color: 'red'}}>{errorMessage}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Current Password"
            value={currentPassword}
            secureTextEntry
            onChangeText={setCurrentPassword}
          />
          <TextInput
            style={styles.textInput}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
          />
          <Button title="Update Password" onPress={updateUserPassword} />
          <Button title="Cancel" onPress={() => setUpdateModalVisible(!updateModalVisible)} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={deleteModalVisible}
        transparent={true}
        onRequestClose={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}
      >
        <View style={styles.modalStyle}>
          <Text style={styles.textStyle}>Delete account</Text>
          <Text style={{color: 'red'}}>{errorMessage}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Current Password"
            value={currentPassword}
            secureTextEntry
            onChangeText={setCurrentPassword}
          />
          <Button title="Delete User" onPress={deleteUserAccount} />
          <Button title="Cancel" onPress={() => setDeleteModalVisible(!deleteModalVisible)} />
        </View>

      </Modal>

      <View style={styles.container}>
        <Text style={[styles.textStyle, { color: '#ff0000', marginBottom: 20 }]}>Account</Text>
        <Pressable style={styles.pressableStyle} onPress={() => setUpdateModalVisible(true)}>
          <Text style={styles.textStyle}>Update Password</Text>
        </Pressable>
        <Pressable style={styles.pressableStyle} onPress={() => setDeleteModalVisible(true)}>
          <Text style={styles.textStyle}>Delete account</Text>
        </Pressable>
        <Pressable onPress={() => { signOut(auth); }} style={styles.pressableStyle}>
          <Text style={styles.textStyle}>Logout</Text>
        </Pressable>
      </View>
    </View>

  );
}

// Display: 'flex' is default
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1, // Fill the entire screen instead of just wrapping content
    backgroundColor: '#fff',
    padding: 26,
    alignItems: 'stretch', // Default value, width of items stretch to fit container width
    justifyContent: 'flex-start', // Default value
  },
  pressableStyle: {
    marginVertical: 10
  },
  textStyle: {
    fontSize: 18
  },
  modalStyle: {
    backgroundColor: "white",
    margin: 26,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    borderWdith: 8,
    borderColor: 'black'
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 8,
    borderBottomWidth: 2,
    marginVertical: 8,
  }
});