import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,ScrollView } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';

export default function Respiracao({ navigation }) {
    
    return (
        <View style={{backgroundColor:'#FFFFFF'}}>
               <ScrollView>
                   <View style={{backgroundColor:'#FFFFF',justifyContent:'center', alignItems: 'center',}}>
                        <Text>Respiração Para Cotrole da ansiedade</Text>
                        <Text>A respiração profunda é uma maneira de levar seu cérebro ao relaxamento como qualquer outra habilidade, isso exigirá algum treinamento. O mais importante a ter em mente é que você deve praticar a respiração profunda quando ainda não estiver sentindo uma forte ansiedade. Nossos corpos são ótimos em associar as coisas e se você só respirar profundamente quando já está estressado, pode acidentalmente fazer com que seu corpo realmente espere estresse da respiração profunda. Em vez disso, você deseja passar cerca de 10 minutos, três vezes por semana, respirando profundamente e ensinando seu corpo a passar pelo processo de relaxamento. Portanto, arranje três pontos em sua vida agitada para passar alguns minutos praticando a respiração 4-7-8 ou qualquer outro exercício que funcione bem para você. Concentre-se nas sensações que ocorrem dentro de seu corpo enquanto você respira. Observe como é quando aquele interruptor interno vira e você entra na maravilhosa cascata de relaxamento. E é isso! Acompanhe o gif à baixo para iniciar seu  treinamento:</Text>
                        <Image style={{backgroundColor:'#e0da83', justifyContent:'center',alignItems: 'center', width:300, height:300}} source={require('./imagens/Respiracao.gif')}/>
                   </View>
                </ScrollView>
        </View>
    )
}