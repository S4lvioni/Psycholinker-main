import React, { useState, useEffect, isValidElement } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';

export default function HomeTerapeuta() {
    //variaveis de controle
    const [execucao, setExecucao] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    //terapeuta
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    //criar paciente
    const [code, setCode] = useState(null);
    const [codeA, setCodeA] = useState(null);
    const [terapeutaId, setTerapeuta] = useState(null);
    //listagem
    const [pacientes, setPacientes] = useState([
        {
            name: null, id: '1'
        }
    ]);
    //edit paciente
    const [pacienteName, setpacienteName] = useState(null);
    const [pacienteTelefone, setpacienteTelefone] = useState(null);
    const [pacienteEmail, setpacienteEmail] = useState(null);
    const [response, setResponse] = useState(null);
    const [paName, setpaName] = useState(null)
    useEffect(() => {
        randomCode();
    }, []);

    useEffect(() => {
        getTerapeuta();
    }, []);

    useEffect(() => {
        gerenciaPaciente();
    }, [execucao]);

    async function gerenciaPaciente() {
        let response = await fetch(`${config.urlRoot}listaPaciente`, {
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
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('pacientesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('pacientesData');
            const jsonNovo = JSON.parse(response);
            setPacientes(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }

        }
    }
    async function onEdit(id, nome) {
        /*  let response = await fetch(config.urlRoot + 'editPaciente', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id:id
              })
          });
          //obtem resposta do controller
          let json = await response.json();
          if (json === 'error') {
              console.log('error');
          } else {
              // //persistencia dos dados para utilizar na aplicação
             await AsyncStorage.setItem('pacientesEditData', JSON.stringify(json));//json é  a resposta
            
              let response=await AsyncStorage.getItem('pacientesEditData');
              const jsonNovo = JSON.parse(response);
          }*/
        console.log(nome);
        setModalVisible(true);
        console.log(id);
        setpaName(nome);


    }

    async function onDelete(id) {
        let response = await fetch(config.urlRoot + 'deletePaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
    }

    //pega nome para o bem vindo o
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailData');
            let json = JSON.parse(response);
            setName(json.name);
            setEmail(json.email);
        }
        getName();
    }, []);

    //Pegar o id do Terapeuta
    async function getTerapeuta() {
        let response = await AsyncStorage.getItem('emailData');
        let json = JSON.parse(response);
        setTerapeuta(json.id);
    }

    //Gerar um código randômico
    //Em caso de uso real fazer alterações de segurança**
    async function randomCode() {
        let result = '';
        let length = 5;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        console.log(result);
        setCode(result);
    }
    //Envio do formulário
    async function sendForm() {
        randomCode();
        setCodeA(code);
        let response = await fetch(config.urlRoot + 'createCodPaciente', {
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

    function ListaPaciente({ nome, id }) {
        if (nome != null) {
            return (
                <View>
                    <Text>
                        {nome}
                        <TouchableOpacity style={css.login__button} onPress={() => onEdit(id, nome)} ><Text>E</Text></TouchableOpacity>
                        <TouchableOpacity style={css.login__button} onPress={() => onDelete(id)} ><Text>D</Text></TouchableOpacity>
                    </Text>
                </View>
            )
        } else {
            return (null);
        }

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
                {(execucao == 2) ?
                    <Text>
                        <SafeAreaView style={css.container3}>
                            <FlatList
                                data={pacientes}
                                renderItem={({ item }) => <ListaPaciente nome={item.name} id={item.id} />}
                                keyExtractor={item => item.id.toString()}
                            />
                        </SafeAreaView>
                    </Text>
                    :
                    <View>
                    </View>
                }
                <View>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                    >
                        <View>
                            <Text>{paName}</Text>
                            <TextInput
                                placeholder='Nome:'
                                onChangeText={text => setpacienteName(text)}
                            />
                            <TextInput
                                placeholder='Email:'
                                onChangeText={text => setpacienteEmail(text)}
                            />
                            <TextInput
                                placeholder='Telefone:'
                                onChangeText={text => setpacienteTelefone(text)}
                            />
                            <Pressable
                                style={css.login__button}
                                onPress={() => setModalVisible(!modalVisible)}
                            >

                                <Text >Hide Modal</Text>
                            </Pressable>

                        </View>

                    </Modal>
                </View>
            </View>
        </View>

    );
}