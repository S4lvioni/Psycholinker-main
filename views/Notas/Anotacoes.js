import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, Pressable } from 'react-native';
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
    const [modalVisible, setModalVisible] = useState(false)
    const [text, setText] = useState('')
    return (
        <View>
            <View style={estilo.botoescontainer}>
                <Text style={{ marginLeft: 10 }}>Observações:</Text>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={estilo.botaoaddnota}>
                    <Text style={estilo.textobotao}>
                        Adicionar nota
                </Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    visible={modalVisible}>
                    <TextInput
                        style={{ marginLeft: 5 }}
                        multiline={true}
                        placeholder="Insira sua observação:"
                        onChangeText={text => setText}
                        defaultValue={text} />

                    <View style={estilo.containerbotao}>
                        <Pressable
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
            </View>
        </View>
    )
}

const estilo = StyleSheet.create({
    botoescontainer: {
        width: 120,
        padding: 10
    },
    botaoaddnota: {
        marginTop: 5,
        height: 40,
        borderRadius: 30,
        width: 130,
        backgroundColor: '#FFB6C1',
        alignItems: 'center',
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
    }
})
export default Anotacoes