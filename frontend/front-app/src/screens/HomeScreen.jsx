import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';

import EmailInputComponent from '../components/Home/EmailInput';
import SubmitButtonComponent from '../components/Home/SubmitButton';
import TextTopComponent from '../components/Home/TextTop';
import InfoTextComponent from '../components/Home/InfoText';

function HomeScreen() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    console.log('Email soumis :', email);
  };

  const screenWidth = Dimensions.get('window').width;
  const maxContentWidth = Math.min(500, screenWidth - 20);

  const [baseScale, setBaseScale] = useState(1);
  const [pinchScale, setPinchScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState(0);

  const handlePinch = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setPinchScale(event.nativeEvent.scale);
    }
  };

  const handlePinchEnd = () => {
    setBaseScale(baseScale * pinchScale);
    setPinchScale(1);
    setScaleOffset(0);
  };

  const contentStyle = {
    transform: [{ scale: baseScale * pinchScale + scaleOffset }],
  };

  return (
    <PinchGestureHandler
      onGestureEvent={handlePinch}
      onHandlerStateChange={handlePinchEnd}
    >
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {/* Or use InputScrollView */}
        {/* <InputScrollView contentContainerStyle={styles.container}> */}
          <View style={[styles.content, contentStyle, { maxWidth: maxContentWidth }]}>
            <TextTopComponent text="Saissisez votre email afin de vérifier si il s'agit d'un spam" />
            <InfoTextComponent text="Vérifier si vos emails ne sont pas des spams grâce à une solution moderne" />
            <EmailInputComponent value={email} onChangeText={handleEmailChange} />
            <SubmitButtonComponent onPress={handleSubmit} text="Envoyer" />
          </View>
        {/* </InputScrollView> */}
      </KeyboardAwareScrollView>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
  },
  content: {
    alignItems: 'flex-start',
    padding: 10,
  },
});

export default HomeScreen;
