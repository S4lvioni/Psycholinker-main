
import React, { useState, useEffect, isValidElement } from 'react';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import { Text, View, Button } from 'react-native';


export default function HomePaciente({ HomePaciente }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    //pega nome para o bem vindo o
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setName(json.name);
            setEmail(json.email);
        }
        getName();
    }, []);
    return (
        <View>
            <Text style={css.titulohome}>Essa é a Home do Paciente</Text>
            <Text style={css.sumario}>Bem vindo(a)  {name}</Text>
        </View>
    );
}