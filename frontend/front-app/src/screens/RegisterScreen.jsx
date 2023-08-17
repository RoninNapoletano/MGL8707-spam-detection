import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import AuthService from '../services/AuthService';
import SubmitButtonComponent from '../components/Home/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { getAuth, getIdToken } from 'firebase/auth';

import LoginScreen from './LoginScreen';
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
        navigation.navigate('LoginScreen'); 
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
  const handleNavigateToLogin = () => {
    navigation.navigate('Login'); // Remplacez 'Login' par le nom que vous avez donné à votre page de connexion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Créer un compte</Text>
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
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>S'enregistrer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLinkContainer} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginLink}>Déjà un compte ? <Text style={styles.violetText}>Se connecter</Text></Text>
      </TouchableOpacity>
    </View>
);

}


const screenWidth = Dimensions.get('window').width;
const isPortrait = screenWidth < Dimensions.get('window').height;

const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
const isTabletDevice = isMobileDevice && screenWidth >= 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: isMobileDevice ? (isPortrait ? '80%' : '50%') : isTabletDevice ? 400 : 465,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputFocused: {
    borderColor: '#6054B6', // Change color when focused
  },
  loginButton: {
    width: isMobileDevice ? (isPortrait ? '80%' : '50%') : isTabletDevice ? 400 : 465,
    backgroundColor: '#6054B6', 
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: isMobileDevice ? (isPortrait ? '10%' : '10%') : isTabletDevice ? '2%' : '2%',
  },
  loginLink: {
    color: 'black', // Couleur par défaut du texte
  },
  violetText: {
    color: '#6054B6', // Couleur violette
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