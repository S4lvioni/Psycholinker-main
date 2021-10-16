import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Respiracao({ navigation }) {
    
    return (
        <View style={{backgroundColor:'#e0da83',
             justifyContent:'center',
             alignItems: 'center',
        }}>
            <ScrollView>
                <View style={{backgroundColor:'#e0da83',justifyContent:'center', alignItems: 'center',}}>
                    <Text>Relaxamento</Text>
                    <Text>Treinamento autógeno:</Text>
                    <Text>Para fazer o treinamento autógeno, arrume-se em uma posição confortável e siga os passos a seguir para aliviar sua mente e corpo.</Text>
                    <Image style={{backgroundColor:'#e0da83', justifyContent:'center',alignItems: 'center', width:300, height:300}} source={require('./imagens/autógeno.gif')}/>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5 }}><Text  style={{fontWeight: "bold", }}>1.</Text><Text> Respirando profundamente e sem esforço, ao expirar repita mentalmente cinco vezes a frase: “Sinto-me perfeitamente calmo(a) e relaxado(a)” </Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",}}>2.</Text><Text>Concentre-se no braço direito e, ao expirar, repita duas vezes: “Sinto meu braço direito relaxado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold", }}>3.</Text><Text>Mantendo o ritmo ao respirar, repita por três vezes, ao expirar, a frase: “Estou completamente tranquilo(a)”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>4.</Text><Text>Foque-se no outro braço e repita duas vezes, durante a expiração: “Sinto meu braço esquerdo relaxado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>5.</Text><Text> Em seguida, repita três vezes, ao expirar, a frase: “Respiro calmamente”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>6.</Text><Text> No passo seguinte, diga mentalmente duas vezes enquanto expira: “Sinto meus dois braços pesados” e “Sinto meus dois braços quentes”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>7.</Text><Text>Repita a mesma sequência com a perna direita e, em seguida, com a perna esquerda</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>8.</Text><Text>Quando acabar os braços e as pernas, repita por três vezes quando expirar: “Sinto meu corpo pesado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold"}}>9.</Text><Text>Ao encerrar os exercícios, permaneça imóvel por 2 minutos, respire intensamente por três vezes, abra os olhos e espreguice</Text></View>
                 </View>
            </ScrollView>
        </View>
    )
}