import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importez les icônes appropriées
import { createStackNavigator } from "@react-navigation/stack";
import {  StyleSheet} from 'react-native';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import ProfileScreen from '../../screens/ProfileScreen';

import AuthStack from './AuthStack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function Navigation() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)

    }
});
});
  return (
    <NavigationContainer>
      <Tab.Navigator 
       screenOptions={{
        tabBarActiveTintColor: "#6054B6",
        tabBarInactiveTintColor: "#767676",
        headerShown: false,
      }}
      tabBarOptions={{tabStyle: { borderTopWidth: 2, borderTopColor: '#dadde2' }
      , style: { borderTopWidth: 2, borderTopColor: '#dadde2'} }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
          {!user ? (
          <Tab.Screen
            name="Login"
            component={AuthStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="log-in" size={size} color={color} />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          
        )}
        {user ? (
          <Tab.Screen
            name="History"
            component={HomeScreen} // Replace "HistoryScreen" with your actual history screen component
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="history" size={size} color={color} />
              ),
            }}
          />
        ) : null}
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    borderTopWidth: '2px'
  },
})
