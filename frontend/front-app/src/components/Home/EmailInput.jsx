import React from 'react';
import { Text, TextInput, View, StyleSheet, Dimensions, Platform } from 'react-native';

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
    alignItems: 'flex-start',
    marginBottom: 20,
  };
  const asteriskStyle = {
    color: 'red',
    marginLeft: 2,
  };

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>
        Email
        <Text style={asteriskStyle}>*</Text>
      </Text>
      <TextInput
        style={emailFieldStyle}
        required
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
  },
});

export default EmailInputComponent;
