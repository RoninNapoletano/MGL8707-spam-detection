import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ShowResultPrediction = ({ text }) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.initialText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', // Align items to the left
    marginTop: 5,
    marginBottom: 25,
  },
  initialText: {
    fontSize: 15, // Smaller font size
    color: 'blue', // Custom color
  },
});

export default ShowResultPrediction;