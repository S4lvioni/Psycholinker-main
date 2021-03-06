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

AnotacoesPaciente = () => {
    const [observacoes, setObservacoes] = useState([
        {
            texto: null, id: '1'
        }
    ])
    const backgroundimg = require('../../assets/gradient2.png')
    const [pacienteId, setPacienteId] = useState(null)
    const [texto, setTexto] = useState('')
    const [terapeutaId, setTerapeutaId] = useState(null)
    const [observacao, setObservacao] = useState(null)

    const [refresh, setRefresh] = useState(false);
    const [execucao, setExecucao] = useState(1);
    const [dialogVisible, setDialogVisible] = useState(false)


    //pegando id do paciente
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setPacienteId(json.id)
        }
        getName();
    }, []);


    useEffect(() => {
        mostraObservacoes();
    }, [execucao]);

    //mostra observacoes
    async function mostraObservacoes() {
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
            // //persistencia dos dados para utilizar na aplica????o
            await AsyncStorage.setItem('ObservacoesData', JSON.stringify(json));//json ??  a resposta

            let response = await AsyncStorage.getItem('ObservacoesData');
            const jsonNovo = JSON.parse(response);
            setObservacoes(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    function ListaObservacoes({ texto, id }) {

        if (texto != null) {
            return (
                
                <View >
                    <View
                        style={estilo.observacoescontainer}>
                            <Image source={require('../../assets/post-it.png')}
                    style={{width:30,height:30, marginTop:10}} />
                            <View style={{paddingLeft:5, marginTop:3}}>
                            <Text
                                style={estilo.observacoeslista}>{texto}</Text>
                                </View>
                            
                        
                    </View>
                </View >
                
            )
        } else {
            return (null);
        }
    }


    return (
            <FlatList style={estilo.lista2}
                data={observacoes}
                renderItem={({ item }) => <ListaObservacoes texto={item.texto} id={item.id} />}
                keyExtractor={item => item.id.toString()}
                extraData={refresh}
            />
    )
}

const estilo = StyleSheet.create({
    botoescontainer: {
        width: 120,
        padding: 10,
        
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        justifyContent:'center',
        textAlignVertical:'center',
        flexWrap:'wrap'
        
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
        justifyContent:'flex-start',
        width:300
    },
    lista2: {
        width: 500,
        textAlign:'center'
    },
    observacoescontainer: {
        padding: 10,
        flexDirection:'row'
    },
    botoeshorizontais: {
        flexDirection: 'row'
    }
})

export default AnotacoesPaciente