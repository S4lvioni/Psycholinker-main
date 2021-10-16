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
                    <TouchableOpacity onPress={() =>  escolhido('1')}>
                        <Image style={css.exercicioIcone} source={require('./imagens/respiracao.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>   escolhido('2')}>
                        <Image style={css.exercicioIcone} source={require('./imagens/relaxamento.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>   escolhido('3')}>
                        <Image style={css.exercicioIcone} source={require('./imagens/meditacao.png')} />
                    </TouchableOpacity>
               </View>
            
        </View>
    )
}
