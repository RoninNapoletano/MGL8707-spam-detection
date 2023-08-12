import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TextTopComponent = ({ text }) => {
  const parts = text.split(' ');
  const lastWords = parts.slice(-2).join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.coloredText}>{parts.slice(0, -2).join(' ')}</Text>
      <Text style={[styles.coloredText, styles.lastWords]}>{lastWords}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', // Align items to the left
    marginTop: 10,
  },
  coloredText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  lastWords: {
    color: '#6054B6', // Change the color as needed
    marginTop: 5, // Adjust the margin as needed
  },
});

export default TextTopComponent;
