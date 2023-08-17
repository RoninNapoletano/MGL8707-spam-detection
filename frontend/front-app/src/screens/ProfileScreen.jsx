import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { AlertContext } from '../contexts/Alert';

import AvatarImg from '../../assets/avatar_img.png'
import CardCov from '../../assets/img6.jpeg'

const ProfileScreen = () => {
  const [email, setEmail] = useState(null);
  const auth = getAuth();
  const { dispatch } = useContext(AlertContext);

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
    }
  }, [auth.currentUser]);

  const resetPassword = async () => {
    const email = auth.currentUser.email;
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: 'open', message: 'Email envoyé', alertType: 'success' });
    } catch (error) {
      dispatch({ type: 'open', message: error.message, alertType: 'error' });
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={CardCov} />
        <Card.Content style={styles.cardContent}>
          <Avatar.Image
            source={AvatarImg}
            size={100}
          />
          <Paragraph style={styles.paragraph}>{email}</Paragraph>
        </Card.Content>
      </Card>
      <Button mode="contained" style={styles.button} onPress={resetPassword}>
        Réinitialiser votre mot de passe
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '80%',
    maxWidth: 400,
  },
  cardContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
  },
  paragraph: {
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default ProfileScreen;
