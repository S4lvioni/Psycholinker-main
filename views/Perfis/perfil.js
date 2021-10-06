import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import Anotacoes from '../Notas/Anotacoes'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TextInput,
    Platform,
    RefreshControl
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';


export default function Perfil({ navigation }) {
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [tela,setTela] = useState(1);

    //pegar o nome do paciente atual
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setName(json.name);
            setId(json.id)
        }
        getName();
    }, []);



    return (
        <View>
            <View>
                <Text style={css.welcometag}> {name}</Text>
            </View>
            <View>
                <Anotacoes />
            </View>
        </View>
    )
}


