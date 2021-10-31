import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import AgendamentoPaciente from '../Agendamento/AgendamentoPaciente';

export default function NavegacaoAgendaPaciente({ navigation }) {
    const [id, setId] = useState(null);
    useEffect(() => {
        async function getId() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setId(json.id);
        }
        getId();
    }, []);
       
    
    return (
        <View>
                <AgendamentoPaciente data={id}/>

        </View>
    )
}
