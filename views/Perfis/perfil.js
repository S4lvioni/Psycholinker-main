import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import Anotacoes from '../Notas/Anotacoes'
import Graficos from '../Gráficos/Graficos'
import HumorTerapeuta from '../Humor/humorTerapeuta';
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
import NavegacaoAnotacoes from '../Notas/NavegacaoAnotacoes';


export default function Perfil({ navigation }) {
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [tela, setTela] = useState(1);

    //pegar o nome do paciente atual
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setName(json.name);
            setId(json.id)
        }
        getName();
    }, []);



    return (
        <ScrollView style={css.fundobranco}>
            <View style={{ backgroundColor: '#FFB6C1' }}>
                <Text style={css.welcometag}> {name}</Text>
            </View>
            <View 
            contentContainerStyle='justifyContent' style={estilo.containerbotoes}>
                <Graficos data={id} />
            </View>
            <View style={{ bottom: 0,  width: '100%', backgroundColor:'#fff',elevation:20,alignItems: 'center'}}>
                <View style={{marginHorizontal:25, flexDirection: 'row', alignItems: 'center', marginBottom:3}}>

                            <View style={{ alignItems: 'center', width: 80, height: 80,marginHorizontal:5 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Humor')}>
                                    <Image style={{ width: 47, height: 47, marginTop: 3 }} source={require("../../assets/relatorioIcon.png")} />
                                </TouchableOpacity>
                                <Text>Relatórios</Text>
                            </View>


                            <View style={{ alignItems: 'center', marginBottom:0, width: 80, height: 80,marginHorizontal:5 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Anotacoes')}>
                                    <Image style={{ width: 47, height: 47, marginTop: 3 }} source={require("../../assets/anotaçoes.png")} />
                                </TouchableOpacity>
                                <Text>Anotações</Text>
                            </View>
                        </View> 
            </View>   
        </ScrollView>
        
    )
}


const estilo = StyleSheet.create({
    containerbotoes:{
        alignItems:'center',
    },
    buttoncontainer:{
        alignItems:'center',
        width:300,
        marginBottom:70
    },
    btnn:{
        width:150,
        height:30,
        borderRadius:10,
        backgroundColor:'salmon',
        margin:10
    },
    btnnText:{
        fontSize:18,
        color:'#FFF',
        fontWeight:'bold',
        textAlignVertical:'center',
        textAlign:'center'
    }
})


