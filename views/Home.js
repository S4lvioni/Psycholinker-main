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
                
                <View>
                <Text style={css.login__msg(display)}>Email incorreto!</Text>
            </View>
                
                    </View>
            <View style={{justifyContent:'flex-start', paddingHorizontal:15, flexDirection:'row', width:'100%'}}>
                <View style={{backgroundColor:' rgba(255,255,255,0.5)', height:41.8, borderBottomLeftRadius:18,
            borderTopLeftRadius:18, alignItems:'center', flexDirection:'row'}}>
                <Image  source={mail} style={{width:30, height:30, marginLeft:5}}/></View>
                <TextInput  style={css.login__input} placeholder='Email' placeholderTextColor='#808080' onChangeText={text => setEmail(text)}/>
            </View>

            <View style={{justifyContent:'flex-start', paddingHorizontal:15, flexDirection:'row', width:'100%'}}>
                <View style={{backgroundColor:' rgba(255,255,255,0.5)', height:41.8, borderBottomLeftRadius:18,
            borderTopLeftRadius:18, alignItems:'center', flexDirection:'row'}}>
                <Image  source={cadeado} style={{width:30, height:30, marginLeft:5}}/></View>
                <TextInput  style={css.login__input} placeholder='Senha' placeholderTextColor='#808080' onChangeText={text => setPassword(text)}
                secureTextEntry={true}/>
            </View>
                <View style={{flexDirection: 'row',justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style = {{flexDirection: 'row', marginHorizontal:10, width:120,height:35, borderRadius:18, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}} onPress={() =>sendFormTerapeuta()}>
                        <Text style={{color:'#808080', fontSize:15, fontWeight:'bold'}}>Terapeuta</Text>
                        <Image style={{width:30, height:30}} source={require("./../assets/entrar.png")}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{flexDirection: 'row', marginHorizontal:10, width:120,height:35, borderRadius:18, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}} onPress={() =>sendFormPaciente()}>
                        <Text style={{color:'#808080', fontSize:15, fontWeight:'bold'}}>Paciente</Text>
                        <Image style={{width:30, height:30}} source={require("./../assets/entrar.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'flex-end', alignItems:'center', height:100}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastros')}>
                    <Text style={{fontSize:17}}>Não tem uma conta? Cadastre-se agora!</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ImageBackground>
        </View>


    )
}