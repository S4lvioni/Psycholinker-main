import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image,StyleSheet } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';

export default function exercicios({ navigation }) {
    function escolhido(n){
        if(n=='1'){
            navigation.navigate('Respiracao');
        }else{
            if(n=='2'){
                navigation.navigate('Relaxamento');
            }else{
                navigation.navigate('Meditacao');
            }
        }
       
    }
    return (
        <View>
                <View style={css.exercicioIconeContainer}>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() =>  escolhido('1')}>
                            <Image style={css.exercicioIcone} source={require('./imagens/respiracao.png')} />
                        </TouchableOpacity>
                        <Text style={{marginTop:-4,fontSize:14}}>Respiração</Text>
                        <Text style={{marginTop:-3,fontSize:14}}>Ralaxante</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() =>   escolhido('2')}>
                            <Image style={css.exercicioIcone} source={require('./imagens/relaxamento.png')} />
                        </TouchableOpacity>
                        <Text style={{marginTop:-4,fontSize:14}}>Treinamento</Text>
                        <Text style={{marginTop:-3,fontSize:14}}>Autógeno</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() =>   escolhido('3')}>
                            <Image style={css.exercicioIcone} source={require('./imagens/meditacao.png')} />
                        </TouchableOpacity>
                        <Text style={{marginTop:-4,fontSize:14}}>Meditação</Text>
                        <Text style={{marginTop:-3,fontSize:14}}>Mindfulness</Text>
                    </View>
               </View>
            
        </View>
    )
}
