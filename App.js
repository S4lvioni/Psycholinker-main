import React, { useState, useEffect } from 'react';
import { AsyncStorage, SafeAreaView } from 'react-native';
import { Text, View, Button } from 'react-native';
import { css } from './assets/CSS/css';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, HomePaciente, Login } from './views'
import HomeTerapeuta from "./views/HomeTerapeuta/HomeTerapeuta";
import CadastroTerapeuta from './views/Cadastro/CadastroTerapeuta';
import CadastroPaciente from './views/Cadastro/CadastroPaciente';
import Cadastros from './views/Cadastro/Cadastros';
import { LogBox } from 'react-native';



export default function App() {

  const Stack = createStackNavigator();

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
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
        <Stack.Screen name="HomeTerapeuta" component={HomeTerapeuta} />
        <Stack.Screen name="CadastroTerapeuta" component={CadastroTerapeuta} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
        <Stack.Screen name="Cadastros" component={Cadastros} />

      </Stack.Navigator>


    </NavigationContainer>

  );
}


