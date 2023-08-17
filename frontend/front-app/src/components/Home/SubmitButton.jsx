import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TextInput, View, Dimensions, Platform } from 'react-native';
import { Button } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;
const isPortrait = screenWidth < Dimensions.get('window').height;

const isMobileDevice = Platform.OS === 'ios' || Platform.OS === 'android';
const isTabletDevice = isMobileDevice && screenWidth >= 768;

const SubmitButtonComponent = ({ onPress, text }) => (
  <Button mode="contained" onPress={onPress} style={{ width:  isMobileDevice ? (isPortrait ? '80%' : '50%') : isTabletDevice ? 400 : 465 }} >
    {text}
  </Button>
);

export default SubmitButtonComponent;
