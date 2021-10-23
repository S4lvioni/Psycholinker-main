import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import AgendamentoTerapeuta from '../Agendamento/AgendamentoTerapeuta';
import { set } from 'react-native-reanimated';
export default function Agenda({ navigation }) {
    const [id, setId] = useState(null);
    const [horasconf, setHorasconf] = useState(null);
    useEffect(() => {
        async function getId() {
            let response = await AsyncStorage.getItem('emailData');
            let json = JSON.parse(response);
            setId(json.id);
            setHorasconf(json.horasconf);
        }
        getId();
    }, []);
    return (
        <View>
                <Text style={{backgroundColor:'#ffcbdb', fontWeight:'bold'}}>Acesse a configurção dos deus horários no menu principal</Text>   
                <View><AgendamentoTerapeuta data={id}/></View>    
        </View>
    )
}
