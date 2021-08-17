//import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { css } from '../assets/CSS/css';

export default function Login({navigation})//routepara passar parametros para a rota
{
    const [display, setDisplay] = useState('none');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);

    async function sendForm() {
        let response = await fetch('http://192.168.0.42:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        //obtem resposta do controller
        let json=await response.json();
        if(json === 'error'){
            setDisplay('flex');
            setTimeout(()=>{
                setDisplay('none');
            },5000);
            await AsyncStorage.clear();
        }else{
            //persistencia dos dados para utilizar na aplicação
           await AsyncStorage.setItem('emailData', JSON.stringify(json));//json é  a resposta
           navigation.navigate('HomeTerapeuta');
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.darkbg]}>
            {<View style={css.login__logomarca}>
                <Image style={css.img1} source={require('../assets/LOGO just brethe.png')} />
                <Text>{email} - {password}</Text>
            </View>}
            <View>
                <Text style={css.login__msg(display)}>Usuário ou senha inválidos!</Text>
            </View>

            <View style={css.login__form}>
                <TextInput style={css.login__input} placeholder='Email:' onChangeText={text => setEmail(text)} />
                <TextInput style={css.login__input} placeholder='Senha:' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                <TouchableOpacity style={css.login__button}
                    onPress={() => sendForm()} >
                    <Text style={css.login__buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}