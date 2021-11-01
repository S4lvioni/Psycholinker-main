import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,ScrollView } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';

export default function Respiracao({ navigation }) {
    
    return (
        <View style={{backgroundColor:'#FFFFFF'}}>
            <View style={{backgroundColor:'#50c289',width:'100%'}}>
                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    padding: 10,
                    color:'#fff',
                    fontWeight:'bold'
                }}>
                Respiração Para Cotrole da ansiedade</Text>
            </View>   
               <ScrollView style={{marginHorizontal:15, marginTop:10, height:500}}>
                   <View style={{backgroundColor:'#FFFFF',justifyContent:'center', alignItems: 'center',}}>
                        <Text style={{fontSize:17}}>Com a respiração profunda levamos o cérebro ao relaxamento. Como qualquer outra habilidade, isso exigirá algum treinamento. Ela deve ser praticada quando você ainda não estiver sentindo uma forte ansiedade, pois se você só respirar profundamente quando já está estressado, pode acidentalmente fazer com que seu corpo associe stress a respiração profunda. A melhor forma de praticar é  passar cerca de 10 minutos, três vezes por semana, respirando profundamente e ensinando seu corpo a passar pelo processo de relaxamento.</Text>
                        <Image style={{backgroundColor:'#e0da83', justifyContent:'center',alignItems: 'center', width:200, height:200}} source={require('./imagens/relaxamento.jpg')}/>
                        <Text style={{fontSize:17}}> Portanto, arranje três pontos em rotina para passar alguns minutos praticando a respiração 4-7-8 ou qualquer outro exercício que funcione bem para você. Concentre-se nas sensações que ocorrem dentro de seu corpo enquanto você respira. Observe como é quando aquele interruptor interno vira e você entra na maravilhosa cascata de relaxamento. E é isso! Acompanhe o gif à baixo para iniciar seu  treinamento:</Text>
                        <Image style={{backgroundColor:'#e0da83', justifyContent:'center',alignItems: 'center', width:270, height:270}} source={require('./imagens/Respiracao.gif')}/>
                   </View>
                </ScrollView>
        </View>
    )
}