import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../screens/HomeScreen';

const Stack = createStackNavigator();

export default  function Navigation() {
  return (
    <NavigationContainer
    screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

