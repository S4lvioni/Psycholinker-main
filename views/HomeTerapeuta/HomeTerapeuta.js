import React, {useState,useEffect, isValidElement} from 'react';
import {Text, View, Button,TouchableOpacity} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';

export default function HomeTerapeuta() {
    const [name,setName]=useState(null);
    const [code,setCode]=useState(null);
    const [email, setEmail] = useState(null);
    const [codeA,setCodeA]=useState(null);
    const [terapeutaId,setTerapeuta]=useState(null);
    const [pacientes,setPacientes]=useState([]);
    const [response, setResponse] = useState(null);
    const [lista, setLista] = useState([]);
    const [jeison, setJeison] = useState([]);

    const pacientesarray = [
        {
            name: name, id : '1'      
        },
        {
            name: name, id : '2'
        }
    ]
    useEffect(()=>{
        randomCode();
    },[]);

    useEffect(()=>{
        getTerapeuta();
    },[]);

    useEffect(()=>{
        gerenciaPaciente();
    },[]);

    async function gerenciaPaciente() {
        let response = await fetch(`${config.urlRoot}gerenciaPaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terapeutaId: terapeutaId
            })
        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('pacientesData', JSON.stringify(json));//json é  a resposta
            console.log('foi');
            let response=await AsyncStorage.getItem('pacientesData');
            const jsonNovo = JSON.parse(response);
            console.log(`Aqui está ${jsonNovo}`);
            
        }
    }
    //pega nome para o bem vindo o
    useEffect(()=>{
        async function getName()
        {
            let response=await AsyncStorage.getItem('emailData');
            let json=JSON.parse(response);
            setName(json.name);
            setEmail(json.email);
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
            let length=5;
            let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            console.log(result);
            setCode(result);
        }
        //Envio do formulário
        async function sendForm()
        {
            randomCode();
            setCodeA(code);
            let response=await fetch(config.urlRoot+'createCodPaciente',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    terapeutaId: terapeutaId,
                    code: code
                }),

            });
        }

        function ListaPaciente({pacient}){
            return (
                <View>
                    <Text>
                        {pacient}
                    </Text>
                </View>
            )
        }
        return (
        <View>
            <Text>Essa é a Home do Terapeuta</Text>
            <Text>Bem vindo {name}</Text>
            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text>Novo Paciente</Text>
            </TouchableOpacity>
            <Text>{codeA}</Text>
            <View>
            <TouchableOpacity style={css.login__button} onPress={() => gerenciaPaciente()}>
                <Text>Paciente</Text>
            </TouchableOpacity>
            <Text>
                <SafeAreaView style={css.container3}>
                <FlatList
                data={jsonNovo}
                renderItem={({item}) => <ListaPaciente pacient={item.name}/>}
                keyExtractor={item => item.id}
                />
                </SafeAreaView>
            </Text>
            </View>
        </View>

    );
}
