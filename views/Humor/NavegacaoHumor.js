import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, FlatList, Pressable } from 'react-native';
import { css } from '../../assets/CSS/css.js';
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
    RefreshControl,
    Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import HumorTerapeuta from './humorTerapeuta';

export default function NavegacaoHumor({ navigation }) {
    const [pacienteId, setPacienteId] = useState(null)
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setPacienteId(json.id)
        }
        getName();
    }, []);
    return (
        <View>
            <HumorTerapeuta data={pacienteId} />
        </View>
    )
}