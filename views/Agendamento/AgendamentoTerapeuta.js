//configurações de agendamento: colocar horas trabalhadas por dia => definirá horas disponiveis
// 1 = 1h 2 =2h string q vai para o banco : '7,8,9,10,11,14..'
/*var str = 'algum texto';
if(str.match(/texto/)){
  alert('string encontrada');
}*/
//codigo uma const com as horas e um case com uma verificação dentro da string
//vizualizar agenda : meses e dias 
//editar disponibilidade : hora some do dia escolhido (se todas a horas do dia forem ocupados dume o dia)
import React, { Component,useState, useEffect,useCallback } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,ScrollView,Image,TextInput } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import AgendamentoConfig from '../Agendamento/AgendamentoConfig';
AgendamentoTerapeuta=(id)=>{

  return(
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
            <TouchableOpacity  onPress={() => configurarDisponibilidade()}><Image style={css.SmallIcons} source={require("../../assets/AgendamentoIcon.png")} /></TouchableOpacity>
            <AgendamentoConfig data={id.data}/>
          </View>
        );
  
}

export default AgendamentoTerapeuta;
