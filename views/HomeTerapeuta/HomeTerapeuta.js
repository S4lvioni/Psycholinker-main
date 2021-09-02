import React, {useState,useEffect} from 'react';
import {Text, View, Button,TouchableOpacity} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';

export default function HomeTerapeuta() {
    const [name,setName]=useState(null);
    const [code,setCode]=useState(null);
    const [terapeutaId,setTerapeuta]=useState(null);
    const [response, setResponse] = useState(null);

    useEffect(()=>{
        randomCode();
    },[]);

    useEffect(()=>{
        getTerapeuta();
    },[]);

    //pega nome para o bem vindo
    useEffect(()=>{
        async function getName()
        {
            let response=await AsyncStorage.getItem('emailData');
            let json=JSON.parse(response);
            setName(json.name);
        }
        getName();
    },[]);

       //Pegar o id do Terapeuta
       async function getTerapeuta()
       {
           let response=await AsyncStorage.getItem('emailData');
           let json=JSON.parse(response);
           setTerapeuta(json.id);
       }

        //Gerar um código randômico
        //Em caso de uso real fazer alterações de segurança**
        async function randomCode()
        {
            let result = '';
            let length=20;
            let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            console.log(result);
            setCode(result);
        }
        //Envio do formulário
        async function sendForm()
        {
            let response=await fetch(config.urlRoot+'createPaciente',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    terapeutaId: terapeutaId,
                    code: code
                })

            });
        }

    return (
        <View>
            <Text>Essa é a Home do Terapeuta</Text>
            <Text>Bem vindo {name}</Text>
            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text>Novo Paciente</Text>
            </TouchableOpacity>
        </View>

    );
}