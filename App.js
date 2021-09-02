import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View, Button } from 'react-native';
import { css } from './assets/CSS/css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, HomePaciente, Login } from './views'
import HomeTerapeuta from "./views/HomeTerapeuta/HomeTerapeuta";
import CadastroTerapeuta from './views/Cadastro/CadastroTerapeuta';
import CadastroPaciente from './views/Cadastro/CadastroPaciente';



export default function App() {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "PSYCHOLINKER",
            headerStyle: { backgroundColor: "#fad0dd" },
            headerTintColor: '#ff6f9c',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }}
        />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="HomePaciente" component={HomePaciente} />
        {/*<Stack.Screen name="x" component={x} />*/}
        <Stack.Screen name="HomeTerapeuta" component={HomeTerapeuta} />
        <Stack.Screen name="CadastroTerapeuta" component={CadastroTerapeuta} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


