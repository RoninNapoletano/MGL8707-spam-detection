import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Bienvenue sur l'écran d'accueil !</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default HomeScreen;