import React, { useState } from 'react';
import {
  Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import LoginStyles from '../../styles/LoginStyles';
import InlineTextButton from '../../components/InlineTextButton';
import background from '../../assets/background.jpeg';

export default function Login({ navigation }) {
  const auth = getAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (email === '' || password === '') {
      setErrorMessage('Please enter an email and password');
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <ImageBackground style={LoginStyles.imageContainer} source={background}>
      <KeyboardAvoidingView style={LoginStyles.backgroundCover}>
        <Text style={[LoginStyles.lightText, LoginStyles.header]}>Login</Text>
        <Text style={LoginStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[LoginStyles.textInput, LoginStyles.lightTextInput, LoginStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[LoginStyles.textInput, LoginStyles.lightTextInput, LoginStyles.lightText]}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={[LoginStyles.rowContainer, LoginStyles.topMargin]}>
          <Text style={LoginStyles.lightText}>Don&apos;t have an account? </Text>
          <InlineTextButton text="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
        <View style={[LoginStyles.rowContainer, LoginStyles.bottomMargin]}>
          <Text style={LoginStyles.lightText}>Forgotten your password? </Text>
          <InlineTextButton text="Reset" onPress={() => navigation.navigate('ResetPassword')} />
        </View>
        <Button title="Login" onPress={login} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
