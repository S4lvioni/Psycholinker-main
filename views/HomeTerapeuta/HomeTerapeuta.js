import React, { useState, useEffect, Component } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
import AgendamentoTerapeuta from '../Agendamento/AgendamentoTerapeuta';

//
export default function HomeTerapeuta({ navigation }) {
    //variaveis de controle
    const [execucao, setExecucao] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [display, setDisplay] = useState('none')
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
    const [pacienteId, setpacienteId] = useState(null);
    const [pacienteName, setpacienteName] = useState(null);
    const [pacienteTelefone, setpacienteTelefone] = useState(null);
    const [pacienteEmail, setpacienteEmail] = useState(null);
    const [response, setResponse] = useState(null);
    useEffect(() => {
        randomCode();
    }, []);

    useEffect(() => {
        getTerapeuta();
    }, []);

    useEffect(() => {
        gerenciaPaciente();
        console.log('useee');
    }, [execucao]);

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
        /*
*/
        setpacienteName(nome)
        setpacienteId(id);
        setModalVisible(true)
        console.log(pacienteId)
    }


    async function editData() {
        console.log(pacienteName)
        let response = await fetch(config.urlRoot + 'editPaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: pacienteId,
                name: pacienteName,
                email: pacienteEmail,
                telefone: pacienteTelefone
            })
        });

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

    //pegar o nome e id de cada paciente para abrir no perfil
    async function openPerfilPaciente(id, nome) {

        let response = await fetch(`${config.urlRoot}perfilpaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                id: id
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
        }
        navigation.navigate('Perfil');
    }





    function ListaPaciente({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <Text style={css.pacientegerado} >
                        <TouchableOpacity
                            onPress={() => openPerfilPaciente(id, nome)}>
                            <Text style={css.nomepacientehometerapeuta}>{nome}</Text>
                        </TouchableOpacity>
                        <View style={css.modalcontainer}>
                            <TouchableOpacity style={css.modalbotao} onPress={() => onEdit(id, nome)}  ><Text style={css.modaltexto}>Editar</Text></TouchableOpacity>
                            <TouchableOpacity style={css.modalbotao} onPressIn={() => gerenciaPaciente()} onPressIn={() => onDelete(id)} onPress={() => closeUpdate()} ><Text style={css.modaltexto}>Deletar</Text></TouchableOpacity>
                        </View>
                    </Text>
                </View>
            )
        } else {
            return (null);
        }

    }
    async function closeUpdate() {
        gerenciaPaciente();
        setModalVisible(false);
    }
    return (
        <View>
            <Text style={css.titulohome}>Essa é a Home do Terapeuta</Text>
            <Text style={css.sumario}>Bem vindo(a)  {name}</Text>
            <TouchableOpacity style={css.login__button} onPress={() => sendForm()}>
                <Text>Novo Paciente</Text>
            </TouchableOpacity>
            <Text style={css.codigogerado}>{codeA}</Text>
            <View>
                {(execucao == 2) ?
                    <Text>
                        <SafeAreaView style={css.container3}>
                            <FlatList
                                data={pacientes}
                                renderItem={({ item }) => <ListaPaciente nome={item.name} id={item.id} />}
                                keyExtractor={item => item.id.toString()}
                                extraData={refresh}
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
                            <Text>{pacienteName}</Text>
                            <Text>{pacienteId}</Text>
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
                                onPressIn={() => editData()}
                                onPress={() => closeUpdate()}
                            >
                                <Text >Salvar</Text>
                            </Pressable>
                            <Pressable
                                style={css.login__button}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text >X</Text>
                            </Pressable>

                        </View>

                    </Modal>
                </View>

            </View>
            <AgendamentoTerapeuta/>
        </View>

    );
}