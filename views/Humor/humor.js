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


Humor = (id) => {
    const [humor, setHumor] = useState(null)
    const [texto, setTexto] = useState('')
    const [text, setText] = useState('')
    const [medicacao, setMedicacao] = useState('')
    const [atividade, setAtividade] = useState('')
    const [atividades, setAtividades] = useState([
        {
            nome: null, id: '1'
        }
    ])

    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState('')
    const [execucao, setExecucao] = useState(1);


    useEffect(() => {
        gerenciaAtividades();
    }, [execucao]);

    //pega as atividades do banco
    async function gerenciaAtividades() {
        let response = await fetch(`${config.urlRoot}listaAtividades`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
                nome: atividade
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('AtividadesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('AtividadesData');
            const jsonNovo = JSON.parse(response);
            setAtividades(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    //insere nova atividade no banco
    async function salvarAtividade() {
        let response = await fetch(config.urlRoot + 'createActivity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: atividade,
                pacienteId: id.data
            }),
        });
        gerenciaAtividades();
    }


    function ListaAtividades({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <View
                        style={estilo.observacoescontainer}>

                        <Text
                            style={estilo.observacoeslista}>{nome}{id}</Text>
                    </View>
                </View >
            )
        } else {
            return (null);
        }
    }


    return (
        <View>
            <View style={estilo.imagemContainer}>
                <TouchableOpacity
                    onPress={() => setHumor(1)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/felizao.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHumor(2)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/felizinho.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHumor(3)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/normalzinho.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHumor(4)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/tristinho.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHumor(5)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/tristao.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setHumor(6)}>
                    <View>
                        <Image style={estilo.imagem}
                            source={require('../../assets/raiva.png')} />
                    </View>
                </TouchableOpacity>
            </View>

            <TextInput
                style={{ marginLeft: 5 }}
                multiline={true}
                placeholder="Insira sua nota:"
                onChangeText={text => setTexto(text)}
                defaultValue={text} />
            <Text>{humor}{texto}</Text>


            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>
                    Oi!
                    </Text>

            </TouchableOpacity>

            <View style={estilo.modalsize}>
                <Modal
                    style={estilo.modalcontent}
                    animationType="slide"
                    visible={modalVisible}>

                    <View>
                        <Text>Insira seus medicamentos:</Text>
                        <TextInput
                            style={{ marginLeft: 5 }}
                            multiline={true}
                            placeholder="Medicacao:"
                            onChangeText={text => setMedicacao(text)}
                            defaultValue={text} />

                        <View>



                            <Text>Insira uma nova atividade:</Text>
                            <Pressable
                                onPress={() => salvarAtividade()}>
                                <Text>Inserir</Text>
                            </Pressable>
                            <TextInput
                                style={{ marginLeft: 5 }}
                                multiline={true}
                                placeholder="Atividade:"
                                onChangeText={text => setAtividade(text)}
                                defaultValue={text} />


                        </View>

                    </View>
                    <Pressable
                        onPress={() => setModalVisible(false)}>
                        <Text>Sair!</Text>
                    </Pressable>
                </Modal>
                <Text>
                    {medicacao}
                    {id.data}

                    <FlatList style={estilo.lista2}
                        data={atividades}
                        renderItem={({ item }) => <ListaAtividades nome={item.nome} id={item.id} />}
                        keyExtractor={item => item.id.toString()}
                        extraData={refresh}
                    />
                </Text>
            </View>

        </View>

    )
}


const estilo = StyleSheet.create({
    imagem: {
        width: 60,
        height: 60
    },
    imagemContainer: {
        flexDirection: 'row'
    }

})
export default Humor