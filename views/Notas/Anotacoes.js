import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, FlatList, Pressable, ImageBackground, Image } from 'react-native';
import { css } from '../../assets/CSS/css.js';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TextInput,
    Platform,
    RefreshControl
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

Anotacoes = () => {
    const backgroundimg = require('./../../assets/gradient2.png')
    const [modalVisible, setModalVisible] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [execucao, setExecucao] = useState(1);
    const [expandir, setExpandir] = useState(null);

    const [text, setText] = useState('')
    const [observacao, setObservacao] = useState('')
    const [pacienteId, setPacienteId] = useState(null)
    const [terapeutaId, setTerapeutaId] = useState(null)
    const [observacoes, setObservacoes] = useState([
        {
            texto: null, id: '1'
        }
    ])

    useEffect(() => {
        gerenciaObservacoes();
    }, [execucao]);

    //pegando id do paciente
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setPacienteId(json.id)
        }
        getName();
    }, []);

    //pegando id do terapeuta
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailData');
            let json = JSON.parse(response);
            setTerapeutaId(json.id)
        }
        getName();
    }, []);

    //mandar a nota para o back-end
    async function criarNota() {
        let response = await fetch(config.urlRoot + 'createNote', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terapeutaId: terapeutaId,
                pacienteId: pacienteId,
                texto: observacao
            }),
        });
        setModalVisible(!modalVisible)
        gerenciaObservacoes()
    }

    async function gerenciaObservacoes() {
        let response = await fetch(`${config.urlRoot}listaObservacoes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: pacienteId,
                terapeutaId: terapeutaId,
                texto: observacao
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('ObservacoesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('ObservacoesData');
            const jsonNovo = JSON.parse(response);
            setObservacoes(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }

    function Expansao() {
        setExpandir(true)
    }


    function ListaObservacoes({ texto, id }) {

        if (texto != null) {
            return (

                <View style={{ flexDirection: 'row', marginTop: 10, width: '90%' }}>
                    <Image source={require('../../assets/post-it.png')}
                        style={{ width: 30, height: 30, marginTop: 10 }} />
                    <View
                        style={estilo.observacoescontainer}>

                        <Text
                            style={estilo.observacoeslista}>{texto}</Text>
                    </View>
                </View >

            )
        } else {
            return (null);
        }
    }


    return (
        <View style={{ width: '100%' }}>
            <View style={estilo.botoescontainer}>
                <View style={estilo.botoeshorizontais}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={estilo.botaoaddnota}>
                        <Text style={estilo.textobotao}>
                            Adicionar nota
                </Text>
                    </TouchableOpacity>

                </View>
                <Modal
                    animationType="slide"
                    visible={modalVisible}>
                    <TextInput
                        style={{ marginLeft: 5 }}
                        multiline={true}
                        placeholder="Insira sua observação:"
                        onChangeText={text => setObservacao(text)}
                        defaultValue={text} />

                    <View style={estilo.containerbotao}>
                        <Pressable
                            onPress={() => criarNota()}
                            style={estilo.botaomodal}>
                            <Text style={estilo.textobotaomodal}>
                                Salvar
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                            style={estilo.botaomodal}>
                            <Text style={estilo.textobotaomodal}>
                                Sair
                            </Text>
                        </Pressable>
                    </View>
                </Modal>
                <View style={{ alignItems: 'flex-start', width: 360, marginTop: 20, }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Observaçoes: </Text>
                </View>

                <FlatList style={estilo.lista2}
                    data={observacoes}
                    renderItem={({ item }) => <ListaObservacoes texto={item.texto} id={item.id} />}
                    keyExtractor={item => item.id.toString()}
                    extraData={refresh}
                />

            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    botoescontainer: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    botaoaddnota: {
        marginTop: 5,
        height: 40,
        borderRadius: 30,
        width: 130,
        backgroundColor: '#FFB6C1',
        alignItems: 'center',
        marginLeft: 5
    },
    textobotao: {
        flex: 1,
        marginTop: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    botaomodal: {
        width: 130,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFB6C1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textobotaomodal: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
        marginBottom: 3
    },
    containerbotao: {
        marginTop: 30,
        height: 100,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    observacoeslista: {
        fontSize: 16,

    },
    lista2: {
        width: '100%',
        padding: 5
    },
    observacoescontainer: {
        borderRadius: 18,
        width: '100%',
        padding: 5
    },
    botoeshorizontais: {
        flexDirection: 'row',

    },
    observacoeslistaout: {
        borderWidth: 3,
        borderColor: 'red',
        borderStyle: 'solid',

    }
})
export default Anotacoes