import React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const EmailInputComponent = () => {
  const screenWidth = Dimensions.get('window').width;
  const isPortrait = screenWidth < Dimensions.get('window').height;

  const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
  const isTabletDevice = isMobileDevice && screenWidth >= 768;

  const emailFieldStyle = {
    width: isMobileDevice ? (isPortrait ? 350 : '50%') : isTabletDevice ? 400 : 465,
    padding: 10,
    borderWidth: 1,
    borderColor: '#6054B6',
    borderRadius: 5,
    minHeight: 100,
  };
  const containerStyle = {
    width: isMobileDevice ? (isPortrait ? 350 : '50%') : isTabletDevice ? 400 : 465,
    alignItems: 'flex-start',
    marginBottom: 15,
  };
  const asteriskStyle = {
    color: 'red',
    marginLeft: 2,
  };

  return (
      <TextInput
        placeholder="Email à analyser"
        label="Email à analyser"
        mode="outlined"
        required
        multiline
        style={[
          styles.input,
        ]}
      />
  );
};

const screenWidth = Dimensions.get('window').width;
const isPortrait = screenWidth < Dimensions.get('window').height;

const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
const isTabletDevice = isMobileDevice && screenWidth >= 768;

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
  },
  input:{
    width: isMobileDevice ? (isPortrait ? 350 : '50%') : isTabletDevice ? 400 : 465,
    height: 150,
    marginBottom: 20,
  }
});

export default EmailInputComponent;
