import React, { useState } from 'react';
import {
  Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import LoginStyles from '../../styles/LoginStyles';
import InlineTextButton from '../../components/InlineTextButton';
import background from '../../assets/background.jpeg';

export default function SignUp({ navigation }) {
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setErrorMessage('Passwords do not match.');
    } else {
      setErrorMessage('');
    }

    setValue(value);
  };

  const signUp = async () => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Feed');
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <ImageBackground style={LoginStyles.imageContainer} source={background}>
      <KeyboardAvoidingView style={LoginStyles.backgroundCover}>    
        <Text style={[LoginStyles.lightText, LoginStyles.header]}>Sign Up</Text>
        <Text style={[LoginStyles.errorText]}>{errorMessage}</Text>
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
          onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
        />
        <TextInput
          style={[LoginStyles.textInput, LoginStyles.lightTextInput, LoginStyles.lightText]}
          placeholder="Confirm Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
        />
        <View style={[LoginStyles.rowContainer, LoginStyles.bottomMargin]}>
          <Text style={LoginStyles.lightText}>Already have an account? </Text>
          <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
        </View>
        <Button title="Sign Up" onPress={signUp} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
