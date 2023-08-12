import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const InfoTextComponent = ({ text }) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.initialText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', // Align items to the left
    marginTop: 10,
    marginBottom: 150,
  },
  initialText: {
    fontSize: 14, // Smaller font size
    color: '#A1A3A9', // Custom color
  },
});

export default InfoTextComponent;
