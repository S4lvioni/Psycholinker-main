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
import Perfil from './views/Perfis/perfil'
import exercicios from './views/Exercicios/exercicios';
import Respiracao from './views/Exercicios/Respiracao';
import Relaxamento from './views/Exercicios/Relaxamento';
import Meditacao from './views/Exercicios/Meditacao';
import Agenda from './views/Navegação/NavegaçãoAgenda';
import NavegacaoHumor from './views/Humor/NavegacaoHumor'
import NavegacaoHomePaciente from './views/Navegação/NavegaçãoAgendaPaciente'
//import AgendamentoPaciente from './views/Agendamento/AgendamentoPaciente';
import { LogBox } from 'react-native';
import NavegacaoAnotacoes from './views/Notas/NavegacaoAnotacoes';
import NavegacaoAnotacoesPaciente from './views/Notas/NavegacaoAnotacoesPaciente';
import md5 from '../Psycholinker-main/MD5'



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
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="exercicios" component={exercicios} />
        <Stack.Screen name="Respiracao" component={Respiracao} />
        <Stack.Screen name="Relaxamento" component={Relaxamento} />
        <Stack.Screen name="Meditacao" component={Meditacao} />
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="Humor" component={NavegacaoHumor} />
        <Stack.Screen name="Anotacoes" component={NavegacaoAnotacoes} />
        <Stack.Screen name="NavegacaoHomePaciente" component={NavegacaoHomePaciente} />
        <Stack.Screen name="NavegacaoAnotacoesPaciente" component={NavegacaoAnotacoesPaciente} />

      </Stack.Navigator>


    </NavigationContainer>

  );
}


