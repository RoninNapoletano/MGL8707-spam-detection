import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from "./src/components/navigation/Navigation";
import 'react-native-gesture-handler';
import firebase from './src/firebase/config'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <Navigation />
  );
}
