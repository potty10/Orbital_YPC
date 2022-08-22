import React, { useState } from 'react';
import {
  Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform,
} from 'react-native';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import LoginStyles from '../../styles/LoginStyles';
import InlineTextButton from '../../components/InlineTextButton';
import background from '../../assets/background.jpeg';

export default function ResetPassword({ navigation }) {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <ImageBackground style={LoginStyles.imageContainer} source={background}>
      <KeyboardAvoidingView style={LoginStyles.backgroundCover}>
        <Text style={[LoginStyles.lightText, LoginStyles.header]}>Reset Password</Text>
        <Text style={LoginStyles.errorText}>{errorMessage}</Text>
        <TextInput
          style={[LoginStyles.textInput, LoginStyles.lightTextInput, LoginStyles.lightText]}
          placeholder="Email"
          placeholderTextColor="#BEBEBE"
          value={email}
          onChangeText={setEmail}
        />
        <View style={[LoginStyles.rowContainer, LoginStyles.bottomMargin]}>
          <Text style={LoginStyles.lightText}>Don&apos;t have an account? </Text>
          <InlineTextButton text="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
        <Button title="Reset Password" onPress={resetPassword} color="#f7b267" />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
