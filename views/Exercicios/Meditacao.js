import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image, ScrollView } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';

export default function Respiracao({ navigation }) {
    
    return (
        <View style={{backgroundColor:'#fff', justifyContent:'center',alignItems: 'center'}}>
            <Text style={{fontWeight:'bold', fontSize:18, marginTop:8}}>Meditação Mindfulness</Text>
            <ScrollView style={{marginHorizontal:20}}>
                <View style={{backgroundColor:'#fff', justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{marginBottom:8, fontSize:16}}>1.Sente-se: Endireite as costas, permita-se relaxar um pouco e descanse em uma posição em que sua postura seja boa, sem ficar tenso ou rígido. </Text>
                    <Image style={{ justifyContent:'center',alignItems: 'center', width:250, height:250}} source={require('./imagens/sentar.jpg')}/>
                    <Text style={{marginTop:8, fontSize:16}}>2. Volte sua atenção para sua respiração: A simples observação da respiração acalma automaticamente o corpo e a mente e, como resultado, alonga e aprofunda a respiração. 
                    Concentre-se do início ao fim de cada inspiração e expiração. Concentrar-se no movimento da respiração através das narinas ou no movimento rítmico do abdômen ou do tórax o ajudará a manter o foco. </Text>
                    <Text style={{ fontSize:16}}>3. Conte sua respiração: No final de cada expiração e inspiração, conte 1. Continue essa contagem até 10.Na maioria dos casos, você perderá o foco e diminuirá a contagem em algum lugar no início, geralmente entre 3 e 5, sendo gradual e consistentemente capaz de alcançar números mais altos à medida que pratica mais.</Text>
                    <Image style={{ justifyContent:'center',alignItems: 'center', width:250, height:250}} source={require('./imagens/Meditação-1.png')}/>
                   
                    <Text style={{ fontSize:16}}>4. Observe + Refocalize sua atenção: Se você está perdendo sua atenção constantemente. Totalmente normal e nada com que se preocupar. Na verdade, no começo, é bom perceber isso. Se você está percebendo, significa que sua consciência está melhorando.
                    Mas o que você faz a respeito?Observe a distração - mesmo que você simplesmente tenha percebido que ficou distraído em geral, mas não consegue sentir o que realmente o distraiu.
                    Comece rotulando-o de “distração”. Você gradualmente mudará para “pensamento”, “sentimento” ou “sensação” conforme sua consciência melhora. E, por fim, pensamento específico: “Estou ansioso com o futuro” ou emoção específica: “raiva”. Depois de reconhecer o que o distraiu, concentre-se novamente na respiração e continue contando. </Text>
                </View>
            </ScrollView>
                
        </View>
    )
}