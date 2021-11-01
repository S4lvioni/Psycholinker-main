import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Respiracao({ navigation }) {
    
    return (
        <View style={{backgroundColor:'#fff',
             justifyContent:'center',
             alignItems: 'center',
        }}>
            <View style={{backgroundColor:'#50c289',width:'100%'}}>
                <Text style={{
                    fontSize: 20,
                    textAlign: "center",
                    padding: 10,
                    color:'#fff',
                    fontWeight:'bold'
                }}>Treinamento autógeno</Text>
            </View>
            <ScrollView style={{marginHorizontal:15, marginTop:10, height:500}}>
                <View style={{backgroundColor:'#fff',justifyContent:'center', alignItems: 'center',}}>
                    <Text style={{fontSize:17, marginBottom:8}}>Para fazer o treinamento autógeno, arrume-se em uma posição confortável e siga os passos a seguir para aliviar sua mente e corpo.</Text>
                    <Image style={{backgroundColor:'#e0da83', justifyContent:'center',alignItems: 'center', width:300, height:300}} source={require('./imagens/autógeno.gif')}/>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5, marginTop:8}}><Text  style={{fontWeight: "bold",fontSize:17 }}>1.</Text><Text style={{fontSize:17}}> Respirando profundamente e sem esforço, ao expirar repita mentalmente cinco vezes a frase: “Sinto-me perfeitamente calmo(a) e relaxado(a)” </Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>2.</Text><Text style={{fontSize:17}}>Concentre-se no braço direito e, ao expirar, repita duas vezes: “Sinto meu braço direito relaxado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17 }}>3.</Text><Text style={{fontSize:17}}>Mantendo o ritmo ao respirar, repita por três vezes, ao expirar, a frase: “Estou completamente tranquilo(a)”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>4.</Text><Text style={{fontSize:17}}>Foque-se no outro braço e repita duas vezes, durante a expiração: “Sinto meu braço esquerdo relaxado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>5.</Text><Text style={{fontSize:17}}> Em seguida, repita três vezes, ao expirar, a frase: “Respiro calmamente”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>6.</Text><Text style={{fontSize:17}}> No passo seguinte, diga mentalmente duas vezes enquanto expira: “Sinto meus dois braços pesados” e “Sinto meus dois braços quentes”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>7.</Text><Text style={{fontSize:17}}>Repita a mesma sequência com a perna direita e, em seguida, com a perna esquerda</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>8.</Text><Text style={{fontSize:17}}>Quando acabar os braços e as pernas, repita por três vezes quando expirar: “Sinto meu corpo pesado”</Text></View>
                    <View style={{flexDirection:'row',paddingHorizontal:20, paddingBottom:5}}><Text style={{fontWeight: "bold",fontSize:17}}>9.</Text><Text style={{fontSize:17}}>Ao encerrar os exercícios, permaneça imóvel por 2 minutos, respire intensamente por três vezes, abra os olhos e espreguice</Text></View>
                 </View>
            </ScrollView>
        </View>
    )
}