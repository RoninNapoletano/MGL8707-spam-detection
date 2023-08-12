import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput, View, Dimensions, Platform } from 'react-native';

const SubmitButtonComponent = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Envoyer</Text>
  </TouchableOpacity>
);

const screenWidth = Dimensions.get('window').width;
const isPortrait = screenWidth < Dimensions.get('window').height;

const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
const isTabletDevice = isMobileDevice && screenWidth >= 768;

const styles = StyleSheet.create({
  button: {
    width: isMobileDevice ? (isPortrait ? 350 : '50%') : isTabletDevice ? 400 : 465,
    backgroundColor: '#6054B6', // Button background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitButtonComponent;
