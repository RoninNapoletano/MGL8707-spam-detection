import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AuthService from '../services/AuthService';
import SubmitButtonComponent from '../components/Home/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { getAuth, getIdToken } from 'firebase/auth';

import TokenStorage from '../utils/Token.js'

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordWeak, setIsPasswordWeak] = useState(false);
  const tokenStorage = new TokenStorage();
  
  const handleLogin = async () => {
    if (!emailIsValid(email)) {
      setIsEmailInvalid(true);
      return;
    }

    try {
      const error = await AuthService.signInWithEmailAndPassword(email, password);
      if (error) {
        setErrorMessage(error);
      } else {
        navigation.navigate('Home'); 
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    
    }
  }

  const handleRegister = async () => {
    if (!emailIsValid(email)) {
      setIsEmailInvalid(true);
      return;
    }
  
    try {
      await AuthService.registerWithEmailAndPassword(email, password).then(async(user)=>{
        console.log(user)
        const auth = getAuth();
        const idToken = await getIdToken(auth.currentUser);
        console.log(idToken)
        await tokenStorage.saveToken("id_token", idToken);
        await tokenStorage.saveToken("uid", user.uid);
        await tokenStorage.saveToken(
          "isAnonymous",
          user.isAnonymous
        );
        
      });
      setErrorMessage(null);
      setIsPasswordWeak(false);
      navigation.navigate('Home', { isLoginSuccessVisible: true });
    } catch (error) {
      if (error.message === 'Mot de passe faible. Veuillez choisir un mot de passe plus fort.') {
        setIsPasswordWeak(true);
      } else {
        setErrorMessage(error.message);
      }
    }
  };  

  const emailIsValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setIsEmailInvalid(false);
        }}
        style={[
          styles.input,
          isEmailInvalid && { borderColor: 'red' },
        ]}
      />
      {isEmailInvalid && (
        <Text style={styles.errorText}>L'email est mal formaté</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          setIsPasswordWeak(false);
        }}
        style={[
          styles.input,
          isPasswordWeak && { borderColor: 'red' },
        ]}
      />
      {isPasswordWeak && (
        <Text style={styles.errorText}>Le mot de passe est trop faible</Text>
      )}
      <SubmitButtonComponent onPress={handleRegister} text="Register" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
