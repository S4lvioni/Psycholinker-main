import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { TextInput, TouchableOpacity, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
export default function CadastroTerapeuta({ CadastroTerapeuta }) {
    const [name, setName] = useState(null);
    const [cpf, setCpf] = useState(null);
    const [email, setEmail] = useState(null);
    const [cr, setCr] = useState(null);
    const [especializacao, setEspecializaçao] = useState(null);
    const [password, setPassword] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [response, setResponse] = useState(null);
    //envio
    async function sendForm() {
        let response = await fetch(config.urlRoot + 'createTerapeuta', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                cpf: cpf,
                email: email,
                cr: cr,
                especializacao: especializacao,
                password: password,
                telefone: telefone

            })
        })
    }
    return (
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
                    placeholder='CR:'
                    onChangeText={text => setCr(text)}
                />
                <TextInput
                    placeholder='Especializacao:'
                    onChangeText={text => setEspecializaçao(text)}
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
    );
}