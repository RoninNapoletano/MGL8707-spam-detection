import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

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
    // Effectuez ici vos actions avec l'email saisi (par exemple, soumettez-le à un service)
    console.log('Email soumis :', email);
  };

  return (
    <View style={styles.container}>
      <TextTopComponent text="Entrez votre adresse e-mail :" />
      <InfoTextComponent text="Entrez votre adresse e-mail :" />
      <EmailInputComponent value={email} onChangeText={handleEmailChange} />
      <SubmitButtonComponent onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#F8F9FC',
    paddingHorizontal: 20, // Add horizontal padding
  },
});

export default HomeScreen;