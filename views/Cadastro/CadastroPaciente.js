import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
export default function CadastroPaciente({ CadastroPaciente }) {
    const [code,setCode]=useState(null);
    const [Confere, setConfere] = useState(false);
    //const [idPaciente, setIdPaciente] = useState(null);
    const [display, setDisplay] = useState('none');
    const [name, setName] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [response, setResponse] = useState(null);
    //verificação do codigo
    async function conferir() {
        let response = await fetch(`${config.urlRoot}confereCodigo`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               code:code
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
            let response=await AsyncStorage.getItem('codData');
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
                code:code,
                name: name,
                cpf: cpf,
                email: email,
                password: password,
                telefone: telefone

            })
        })
    }
    return (
        <View>
            {(Confere)?
            <View>
                <View style={css.login__input}>
                <TextInput
                    placeholder='Nome:'
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    placeholder='CPF:'
                    onChangeText={text => setCpf(text)}
                />
                <TextInput
                    placeholder='Email:'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder='Senha:'
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    placeholder='Telefone:'
                    onChangeText={text => setTelefone(text)}
                />
            </View>

            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text>Cadastrar</Text>
            </TouchableOpacity>
            </View>
            :   
            <View>
                <View>
                    <Text style={css.login__msg(display)}>Código inválido!</Text>
                </View>
                <TextInput
                    placeholder='Código de Cadastro:'
                    onChangeText={text => setCode(text)}
                />
                 <TouchableOpacity style={css.login__button} onPress={() => conferir()}>
                <Text>Conferir</Text>
            </TouchableOpacity>
            </View> 
            }
            
        </View>
    );
}