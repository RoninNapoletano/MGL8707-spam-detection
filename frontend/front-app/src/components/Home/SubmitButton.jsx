import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SubmitButtonComponent = ({ onPress }) => (
  <View style={styles.container}>
    <Button title="Envoyer" onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default SubmitButtonComponent;
