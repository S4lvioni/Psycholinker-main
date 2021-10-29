import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import AgendamentoTerapeuta from '../Agendamento/AgendamentoTerapeuta';
import { set } from 'react-native-reanimated';
export default function Agenda({ navigation }) {
    const [id, setId] = useState(null);
    const [horasconf, setHorasconf] = useState(null);
    useEffect(() => {
        async function getId() {
            let response = await AsyncStorage.getItem('emailData');
            let json = JSON.parse(response);
            setId(json.id);
        }
        getId();
    }, []);
    useEffect(()=>{
    },[])

    return (
        <View style={{backgroundColor:'#fff'}}>
           <View style={{backgroundColor:'#fff',flexDirection:"column", alignItems:'center', marginBottom:8, marginTop:8}}>
                <Image style={{height:40, width:40}} source={require("../../assets/aviso.png")}/>
                <Text style={{fontWeight:'bold', marginHorizontal:18,marginRight:10, fontSize:16, color:"#000000"}}>Configure e edite seus horários disponíveis </Text>
                <Text style={{fontWeight:'bold', marginHorizontal:18,marginRight:10, fontSize:16, color:"#000000"}}>no menu principal!</Text>
           </View>
            
              
            <View><AgendamentoTerapeuta data={id}/></View>
        </View>
    )
}
