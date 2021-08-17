import React, {useState,useEffect} from 'react';
import {Text, View, Button} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

export default function HomeTerapeuta() {
    //pega nome para o bem vindo
    const [name,setName]=useState(null);

    useEffect(()=>{
        async function getName()
        {
            let response=await AsyncStorage.getItem('emailData');
            let json=JSON.parse(response);
            setName(json.name);
        }
        getName();
    },[]);

    return (
        <View>
            <Text>Essa é a Home do Terapeuta</Text>
            <Text>Bem vindo {name}</Text>
        </View>
    );
}