import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { css } from '../assets/CSS/css';


const backgroundimg = require( './../assets/gradient2.png')
const mail = require ('./../assets/mail.png')
const cadeado = require ('./../assets/padlock.png')
export default function Home({ navigation }) {

    return (
        
        <View style={{flex:1, justifyContent:'center',backgroundColor:'red'}} >
            <ImageBackground source={backgroundimg} style={{flex:1}}>
                <View><Text>Entre agora!</Text></View>
            <View style={{flex:1, justifyContent:'center'}}>
            <View style={{justifyContent:'center', padding:30}}>
            <Image source={mail} style={{width:30, height:30, position:'absolute', left: 39, top:37}}/>
            <TextInput inlineImageLeft='mail' style={css.login__input} placeholder='          Email' placeholderTextColor='#FFF' onChangeText={text => setEmail(text)}/>
            <Image source={cadeado} style={{width:30, height:30, position:'absolute', left: 39, top:92}}/>
                <TextInput style={css.login__input} placeholder='          Senha' placeholderTextColor='#FFF' onChangeText={text => setPassword(text)} secureTextEntry={true} />
                </View>
                <View>
                    <Text>Não tem uma conta? Cadastre-se agora!</Text>
                </View>
                </View>
            </ImageBackground>
        </View>


    )
}