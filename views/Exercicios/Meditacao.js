import React, { Component, useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Pressable, Image, ScrollView } from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';

export default function Respiracao({ navigation }) {
    
    return (
        <View>
            <ScrollView>
                <View style={{backgroundColor:'#e8e2e4', justifyContent:'center',alignItems: 'center'}}>
                    <Text>Meditação Mindfulness</Text>
                    <Text>1.Sente-se:</Text><Text>Endireite as costas e, em seguida, permita-se relaxar um pouco e descanse em uma posição em que sua postura seja boa, sem ficar tenso ou rígido. </Text>
                    <Image style={{ justifyContent:'center',alignItems: 'center', width:300, height:300}} source={require('./imagens/sentar.jpg')}/>
                    <Text>2. Volte sua atenção para sua respiração</Text><Text>Não tente controlar sua respiração, mesmo que seja curta ou superficial. A simples observação da respiração acalma automaticamente o corpo e a mente e, como resultado, alonga e aprofunda a respiração. 
                    Concentre-se do início ao fim de cada inspiração e expiração. Concentrar-se no movimento da respiração através das narinas ou no movimento rítmico do abdômen ou do tórax o ajudará a manter o foco. </Text>
                    <Text>3. Conte sua respiração</Text><Text>No final de cada expiração e inspiração, conte 1. Continue essa contagem até 10.Na maioria dos casos, você perderá o foco e diminuirá a contagem em algum lugar no início, geralmente entre 3 e 5, sendo gradual e consistentemente capaz de alcançar números mais altos à medida que pratica mais. Não se preocupe, perder o foco constantemente é perfeitamente normal no início - mesmo que pareça que você está perdendo a concentração a cada 10-20 segundos. </Text>
                    <Text>4. Observe + Refocalize sua atenção</Text><Text>Então, você está perdendo sua atenção constantemente. Totalmente normal e nada com que se preocupar. Na verdade, no começo, é bom perceber isso. Se você está percebendo, significa que sua consciência está melhorando.
                    Mas o que você faz a respeito?Observe a distração - mesmo que você simplesmente tenha percebido que ficou distraído em geral, mas não consegue sentir o que realmente o distraiu.
                    Comece rotulando-o de “distração”. Você gradualmente mudará para “pensamento”, “sentimento” ou “sensação” conforme sua consciência melhora. E, por fim, pensamento específico: “Estou ansioso com o futuro” ou emoção específica: “raiva”. Depois de reconhecer o que o distraiu, concentre-se novamente na respiração e continue contando. </Text>
                </View>
            </ScrollView>
                
        </View>
    )
}