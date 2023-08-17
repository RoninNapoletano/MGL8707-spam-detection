import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SnackBar from './src/components/SnackBar';

import Navigation from "./src/components/navigation/Navigation";
import 'react-native-gesture-handler';
import firebase from './src/firebase/config'
import { NavigationContainer } from "@react-navigation/native";
import { AlertProvider } from './src/contexts/Alert';
import "react-native-gesture-handler";

export default function App() {
  const [user, setUser] = useState(null);

  /*useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);*/
  return (
    <AlertProvider>
      <SafeAreaProvider>
      <SafeAreaView>
      </SafeAreaView>
      <Navigation />
      <SnackBar />

    </SafeAreaProvider>
    </AlertProvider>

  );
}
