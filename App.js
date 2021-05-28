import React, {useState, useEffect} from 'react';
import {Text, View,Button } from 'react-native';
import {css} from './assets/CSS/css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home,HomePaciente,Login} from './views'



export default function App() {
  
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                  title:"PSYCHOLINKER",
                  headerStyle:{backgroundColor:"#fad0dd"},
                  headerTintColor:'#ff6f9c',
                  headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
              }}
          />
          <Stack.Screen name="Login" options={{headerShown:false}} component={Login} />
          <Stack.Screen name="HomePaciente" component={HomePaciente} />
          {/*<Stack.Screen name="x" component={x} />*/}

        </Stack.Navigator>
      </NavigationContainer>
);
}


