import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { TextInput, TouchableOpacity, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
export default function CadastroTerapeuta({}) {
    const [name, setName] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [especializacao, setEspecializaçao] = useState(null);
    const [password, setPassword] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [response, setResponse] = useState(null);
    const [display, setDisplay] = useState('none');
    const [display2, setDisplay2] = useState('none');
    //envio

    const backgroundimg = require('./../../assets/gradient2.png')

    async function sendForm() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
          console.log("Email is Not Correct");
          setDisplay2('flex');
          setTimeout(() => {
              setDisplay2('none');
          }, 5000);
          return false;
        }
        else {
            console.log("Email is Correct");
            let response = await fetch(config.urlRoot + 'createTerapeuta', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    especializacao: especializacao,
                    password: password,
                    telefone: telefone

                })
            })
            let json = await response.json();
            if (json === 'error') {
                setDisplay('flex');
                setTimeout(() => {
                    setDisplay('none');
                }, 5000);
                await AsyncStorage.clear();
            } else {
                setDisplay('flex');
                setTimeout(() => {
                    setDisplay('none');
                }, 5000);
            }
        }

    }
    return (
        <View style={{flex:1, justifyContent:'center'}}>
           
            <ImageBackground source={backgroundimg} style={{flex:1}}>
        <View style={{alignItems:'center'}}>
            <View style={{width:'90%',padding:15, justifyContent:'space-evenly'}} >
                <TextInput
                style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                    placeholder='Nome:'
                    onChangeText={text => setName(text)}
                    placeholderTextColor='#000'
                />
                <TextInput
                style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                    placeholder='Email:'
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor='#000'
                />
                <TextInput
                style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                    placeholder='Especializacao:'
                    onChangeText={text => setEspecializaçao(text)}
                    placeholderTextColor='#000'
                />
                <TextInput
                style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                    placeholder='Senha:'
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor='#000'
                />
                <TextInput
                style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                    placeholder='Telefone:'
                    onChangeText={text => setTelefone(text)}
                    placeholderTextColor='#000'
                />
            </View>
            <View>
                <Text style={css.login__msg(display)}>Cadastrado com sucesso!</Text>
            </View>
            <View>
                <Text style={css.login__msg(display2)}>Email incorreto!</Text>
            </View>

            <TouchableOpacity style={{justifyContent:'center',alignSelf:'center', marginBottom:10, width:290, backgroundColor:'#fff', height:35, borderRadius:18, marginTop:20}} onPress={() => sendForm()}>
                <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Cadastrar</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
            
            </View>
        
    );
}