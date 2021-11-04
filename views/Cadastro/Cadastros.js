import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { css } from '../../assets/CSS/css'

export default function Cadastros({ navigation }) {

    const backgroundimg = require('./../../assets/gradient2.png')
    return (
        <ImageBackground source={backgroundimg} style={{flex:1}}>
        <View style={css.cadastros}>
            <TouchableOpacity style = {{flexDirection: 'row', marginHorizontal:10, width:180,height:35, borderRadius:18, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}} onPress={() =>sendFormPaciente()} onPress={() => navigation.navigate('CadastroTerapeuta')}>
            <Image style={{width:25, height:25}} source={require("../../assets/cadastro.png")}/>
                <Text style={css.escolha}>Terapeuta</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{flexDirection: 'row', marginHorizontal:10, width:180,height:35, borderRadius:18, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', marginTop:10}} onPress={() =>sendFormPaciente()} onPress={() => navigation.navigate('CadastroPaciente')}>
            <Image style={{width:25, height:25}} source={require("../../assets/cadastro.png")}/>
                <Text style={css.escolha}>Paciente</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    )

}