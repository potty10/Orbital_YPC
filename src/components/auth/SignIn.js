import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from "@rneui/themed";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

export default function SignIn() {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function onSubmit() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
      <Input
        placeholder='Email'
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        leftIcon={<Icon
          name='envelope'
          size={16}
        />}
      />
      <Input
        placeholder='Password'
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16}
        />}
      />
      <Button title="Sign in" onPress={onSubmit} />
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
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});