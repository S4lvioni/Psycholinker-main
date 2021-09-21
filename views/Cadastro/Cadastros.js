import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { css } from '../../assets/CSS/css'

export default function Cadastros({ navigation }) {


    return (
        <View style={css.cadastros}>
            <TouchableOpacity onPress={() => navigation.navigate('CadastroTerapeuta')}>
                <Text style={css.escolha}>Cadastrar como Terapeuta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CadastroPaciente')}>
                <Text style={css.escolha}>Cadastrar como Paciente</Text>
            </TouchableOpacity>
        </View>
    )

}