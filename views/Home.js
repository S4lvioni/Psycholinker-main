import React,{useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { css } from '../assets/CSS/css';
import config from '../config/config.json';
import { AsyncStorage } from 'react-native';

const backgroundimg = require( './../assets/gradient2.png')
const mail = require ('./../assets/mail.png')
const cadeado = require ('./../assets/padlock.png')
const logo = require('./../assets/logo.png')
export default function Home({ navigation }) {

    const [display, setDisplay] = useState('none');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);

    async function Logar(){
        sendFormPaciente()
        sendFormTerapeuta()
    }


    async function sendFormTerapeuta() {
        let response = await fetch(`${config.urlRoot}loginTerapeuta`, {

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
        let json = await response.json();
        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('emailData', JSON.stringify(json));//json é  a resposta
            navigation.navigate('HomeTerapeuta');
        }
    }


    async function sendFormPaciente() {
        let response = await fetch(`${config.urlRoot}loginPaciente`, {
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
        let json = await response.json();
        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('emailDataP', JSON.stringify(json));//json é  a resposta
            navigation.navigate('HomePaciente');
        }
    }

    return (
        
        <View style={{flex:1, justifyContent:'center'}} >
            <ImageBackground source={backgroundimg} style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center'}}>
                <View style={{ alignItems:'center', marginBottom:20}}>
                <Image source={logo} style={{width:200, height:200}}/>
                </View>
                <View>
                <Text style={{alignSelf:'center', fontSize:23, color:'#fff', fontWeight:'bold'}}>Entre agora!</Text>
                    </View>
            <View style={{justifyContent:'center', padding:30, marginBottom:20}}>
            
            <Image  source={mail} style={{width:30, height:30, position:'absolute', left: 15, top:35}}/>
            <TextInput  style={css.login__input} placeholder='Email' placeholderTextColor='#FFF' onChangeText={text => setEmail(text)}/>
            <Image source={cadeado} style={{width:30, height:30, position:'absolute', left: 15, top:92}}/>
                <TextInput style={css.login__input} placeholder='Senha' placeholderTextColor='#FFF' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                </View>
                <View>
                    <TouchableOpacity style = {{justifyContent:'center',alignSelf:'center', marginBottom:10, width:290, backgroundColor:'#fff', height:35, borderRadius:18}} onPress={() => Logar()}>
                        <Text style={{alignSelf:'center', color:'#000', fontSize:20}}>Entrar</Text> 
                    </TouchableOpacity>
                    </View>
                <View style={{justifyContent:'flex-end', alignItems:'center', height:60}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastros')}>
                    <Text>Não tem uma conta? Cadastre-se agora!</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        </View>


    )
}