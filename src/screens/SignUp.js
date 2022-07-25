import React from 'react';
import {
  Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import background from '../assets/background.jpeg';

export default function SignUp({ navigation }) {
  // const background = require('../assets/background.jpg');
  const auth = getAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [validationMessage, setValidationMessage] = React.useState('');

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage('Passwords do not match.');
    } else {
      setValidationMessage('');
    }

    setValue(value);
  };

  const signUp = async () => {
    if (password === confirmPassword) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Feed');
      } catch (error) {
        setValidationMessage(error.message);
      }
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <KeyboardAvoidingView
        style={AppStyles.backgroundCover}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={60}
      >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
        <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={password}
          onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
        />
        <TextInput
          style={[AppStyles.textInput, AppStyles.lightTextInput, AppStyles.lightText]}
          placeholder="Confirm Password"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Already have an account? </Text>
          <InlineTextButton text="Login" onPress={() => navigation.popToTop()} />
        </View>
        <Button title="Sign Up" onPress={signUp} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
