import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importez les icônes appropriées
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';

import AuthStack from './AuthStack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
 
       <Tab.Screen name="Login" component={AuthStack} options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="log-in" size={size} color={color} />
            ),
          }}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
}
