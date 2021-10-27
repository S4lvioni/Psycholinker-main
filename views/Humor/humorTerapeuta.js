import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, FlatList, Pressable } from 'react-native';
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
    RefreshControl,
    Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

HumorTerapeuta = (idPaciente) => {
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState('')
    const [execucao, setExecucao] = useState(1);
    const pacienteId = idPaciente.data
    const [data, setData] = useState('')
    const [humorimagem, setHumorImagem] = useState(null)
    const [humor, setHumor] = useState(null)
    const [texto, setTexto] = useState('')
    const [emissao, setEmissao] = useState('')
    const [atividade, setAtividade] = useState('')
    const [relatorios, setRelatorios] = useState([
        {
            humor: null, id: '1', texto: null
        }
    ])
    const [atividadesSelecionadas, setAtividadesSelecionadas] = useState([
        {
            nome: null, dia: null, id: '1', data: null
        }
    ])

    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([
        {
            nome: null, dia: null, id: '1', data: null
        }
    ])

    const [diaSelecionado, setDiaSelecionado] = useState([
        {
            nome: null, id: '1', dia: null
        }
    ])
    //DATA

    const [mes, setMes] = useState(0);
    useEffect(() => {
        let today = new Date();
        setMes(today.getMonth() + 1);
    }, []);



    useEffect(() => {
        gerenciaRelatorios();
    }, [execucao]);

    useEffect(() => {
        gerenciaAtividadesSelecionadas(emissao)
    }, [execucao]);

    useEffect(() => {
        gerenciaMedicamentosSelecionados(emissao)
    }, [execucao]);


    async function gerenciaRelatorios() {
        let response = await fetch(`${config.urlRoot}listaRelatorios`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: idPaciente.data,
                texto: texto,
                humor: humor,
                emissao: emissao
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('RelatoriosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('RelatoriosData');
            const jsonNovo = JSON.parse(response);
            setRelatorios(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
            console.log(emissao + 'acelehe')
        }

    }


    function gerenciador(emissao) {
        gerenciaAtividadesSelecionadas(emissao)
        gerenciaMedicamentosSelecionados(emissao)

    }

    async function gerenciaAtividadesSelecionadas(emissao) {
        let response = await fetch(`${config.urlRoot}listaAtividadesSelecionadas`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: pacienteId,
                nome: atividade,
                data: emissao
            })


        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('AtividadesSelecionadasData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('AtividadesSelecionadasData');
            const jsonNovo = JSON.parse(response);
            setAtividadesSelecionadas(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    async function gerenciaMedicamentosSelecionados(emissao) {
        let response = await fetch(`${config.urlRoot}listaMedicamentosSelecionados`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: pacienteId,
                nome: atividade,
                data: emissao
            })


        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('MedicamentosSelecionadosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('MedicamentosSelecionadosData');
            const jsonNovo = JSON.parse(response);
            setMedicamentosSelecionados(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    function ListaRelatorios({ humor, id, texto, emissao, data }) {

        if (texto != null) {
            if (humor == 1) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/felizao.png')} />
                </View>
            } else if (humor == 2) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/felizinho.png')} />
                </View>
            } else if (humor == 3) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/normalzinho.png')} />
                </View>
            } else if (humor == 4) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/tristinho.png')} />
                </View>
            } else if (humor == 5) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/tristao.png')} />
                </View>
            } else if (humor == 6) {
                humor = <View style={estilo.imagemrmkcontainer}>
                    <Image style={estilo.imagemrmk}
                        source={require('../../assets/raiva.png')} />
                </View>
            }
            return (
                <View>
                    <View
                        style={estilo.observacoescontainer}>
                        <TouchableOpacity
                            onPress={() => gerenciador(emissao)}>
                            <Text style={estilo.observacoeslista, { marginBottom: 5 }}>{emissao}</Text>
                        </TouchableOpacity>
                        <View style={estilo.containerobs2}>
                            <Text>{humor}</Text>
                            <Text style={{ marginLeft: 5 }}>{texto}</Text>
                        </View>
                    </View>
                </View >
            )

        } else {
            return (null);
        }
    }


    function ListaAtividadesSelecionadas({ nome, dia, id, data }) {

        if (nome != null) {
            return (
                <ScrollView>
                    <View style={estilo.observacoescontainer, { flexDirection: 'column' }}>
                        <Text style={estilo.observacoeslista}>Atividade: {nome}  id: {id} data completa: {data}</Text>
                    </View>
                </ScrollView >
            )
        } else {
            return (null);
        }

    }

    function ListaMedicamentosSelecionados({ nome, dia, id, data }) {

        if (nome != null) {
            return (
                <ScrollView>
                    <View style={estilo.observacoescontainer, { flexDirection: 'column' }}>
                        <Text style={estilo.observacoeslista}>Medicação: {nome}  id: {id} data completa: {data}</Text>
                    </View>
                </ScrollView >
            )
        } else {
            return (null);
        }

    }

    return (
        <ScrollView>
            <FlatList style={estilo.lista2}
                data={relatorios}
                renderItem={({ item }) => <ListaRelatorios texto={item.texto} id={item.id} humor={item.humor} emissao={item.emissao} />}
                keyExtractor={item => item.id.toString()}
                extraData={refresh}
            />

            <Text>Atividades</Text>
            <FlatList style={estilo.lista2}
                data={atividadesSelecionadas}
                renderItem={({ item }) => <ListaAtividadesSelecionadas nome={item.nome} dia={item.dia} id={item.id} data={item.data} />}
                keyExtractor={item => item.id.toString()}
                extraData={refresh}
            />
            <Text>Medicamentos</Text>
            <FlatList style={estilo.lista2}
                data={medicamentosSelecionados}
                renderItem={({ item }) => <ListaMedicamentosSelecionados nome={item.nome} dia={item.dia} id={item.id} data={item.data} />}
                keyExtractor={item => item.id.toString()}
                extraData={refresh}
            />
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    imagem: {
        width: 60,
        height: 60
    },
    imagemrmk: {
        width: 40,
        height: 40,
        alignItems: 'center'
    },
    imagemrmkcontainer: {
        width: 40,
        height: 40
    },
    imagemContainer: {
        flexDirection: 'row'
    },
    containerquit: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-around'
    },
    linhahorizontal: {
        flexDirection: 'row'
    },
    containerobs2: {
        flexDirection: 'row',
        alignItems: 'center'
    }



})
export default HumorTerapeuta