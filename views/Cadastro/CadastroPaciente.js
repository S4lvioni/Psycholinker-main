import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
export default function CadastroPaciente({}) {
    const [code, setCode] = useState(null);
    const [Confere, setConfere] = useState(false);
    //const [idPaciente, setIdPaciente] = useState(null);
    const [display, setDisplay] = useState('none');
    const [anotherDisplay, setAnotherDisplay] = useState('none');
    const [name, setName] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [response, setResponse] = useState(null);

    const backgroundimg = require('./../../assets/gradient2.png')


    //verificação do codigo
    async function conferir() {
        let response = await fetch(`${config.urlRoot}confereCodigo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
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
            let response = await AsyncStorage.getItem('codData');
            setConfere(1);
        }
    }

    //envio do cadastro
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'createPaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                name: name,
                cpf: cpf,
                email: email,
                password: password,
                telefone: telefone

            })
        })
        let json = await response.json();
        if (json === 'error') {
            setAnotherDisplay('flex');
            setTimeout(() => {
                setAnotherDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            setAnotherDisplay('flex');
            setTimeout(() => {
                setAnotherDisplay('none');
            }, 5000);
        }
    }
    return (
        <View style={{flex:1}}>
            {(Confere) ?
            <ImageBackground source={backgroundimg} style={{flex:1}}>
                <View style={{alignItems:'center', marginTop:30}}>
                <View style={{width:'90%',padding:15, justifyContent:'space-evenly'}} >
                        <TextInput
                        style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                            placeholder='Nome:'
                            onChangeText={text => setName(text)}
                        />
                        <TextInput
                            placeholder='CPF:'
                            onChangeText={text => setCpf(text)}
                            style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                        />
                        <TextInput
                            placeholder='Email:'
                            onChangeText={text => setEmail(text)}
                            style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                        />
                        <TextInput
                            placeholder='Senha:'
                            onChangeText={text => setPassword(text)}
                            style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                        />
                        <TextInput
                            placeholder='Telefone:'
                            onChangeText={text => setTelefone(text)}
                            style={{marginTop:20,backgroundColor:' rgba(255,255,255,0.5)', height:40, borderRadius:10, fontSize:15, padding:10}}
                        />
                    </View>
                    <View>
                        <Text style={css.login__msg(anotherDisplay)}>Cadastrado com Sucesso!</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent:'center',alignSelf:'center', marginBottom:10, width:290, backgroundColor:'#fff', height:35, borderRadius:18, marginTop:20}} onPress={() => sendForm()}>
                <Text style={{alignSelf:'center', fontSize:15, fontWeight:'bold'}}>Cadastrar</Text>
            </TouchableOpacity>
                </View>
                </ImageBackground>
                :
                <View>
                    <View>
                        <Text style={css.login__msg(display)}>Código inválido!</Text>
                    </View>
                    <TextInput
                        placeholder='Código de Cadastro:'
                        onChangeText={text => setCode(text)}
                        style={{alignSelf:'center'}}
                    />
                    <TouchableOpacity style={css.login__button} onPress={() => conferir()}>
                        <Text >Conferir</Text>
                    </TouchableOpacity>
                </View>
                
            }

        </View>
    );
}