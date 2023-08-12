import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import EmailInputComponent from '../components/Home/EmailInput';
import SubmitButtonComponent from '../components/Home/SubmitButton';
import TextTopComponent from '../components/Home/TextTop';
import InfoTextComponent from '../components/Home/InfoText';

function HomeScreen() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    console.log('Email soumis :', email);
  };

  const screenWidth = Dimensions.get('window').width;
  const maxContentWidth = Math.min(500, screenWidth - 20); // Set a maximum width, considering some padding

  return (
    <View style={styles.container}>
      <View style={[styles.content, { maxWidth: maxContentWidth }]}>
        <TextTopComponent text="Saissisez votre email afin de vérifier si il s'agit d'un spam" />
        <InfoTextComponent text="Vérifier si vos emails ne sont pas des spams grâce à une solution moderne" />
        <EmailInputComponent value={email} onChangeText={handleEmailChange} />
        <SubmitButtonComponent onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  content: {
    alignItems: 'flex-start',
    padding: 10,
  },
});

export default HomeScreen;
