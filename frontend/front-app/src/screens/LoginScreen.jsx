import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import RegisterScreen from './RegisterScreen';
import SubmitButtonComponent from '../components/Home/SubmitButton';
import { TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const handleLogin = () => {
    // Handle login logic here
    // For example, you can use AuthService to authenticate the user
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Se connecter</Text>
      <TextInput
        label="Email"
        placeholder="exemple@uqam.ca"
        value={email}
        mode='outlined'
        onChangeText={setEmail}
        style={[
          styles.input,
        ]}
      />
           <TextInput
        label="Mot de passe"
        value={password}
        mode='outlined'
        onChangeText={setPassword}
        secureTextEntry='true'
        style={[
          styles.input,
        ]}
      />
      <SubmitButtonComponent onPress={handleLogin} text="Se connecter" />
      <TouchableOpacity style={styles.loginLinkContainer} onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.loginLink}>Pas de compte ? <Text style={styles.violetText}>S'enregistrer</Text></Text>
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
});