import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { css } from '../assets/CSS/css';




export default function Home({ navigation }) {

    return (

        <View style={css.container2}>
            <View style={css.logo_container}>
                <Image style={css.logo} source={require("../assets/logo.png")} />
            </View>
            <View style={css.button_container}>
                <View style={css.esquerda}>
                    <TouchableOpacity style={css.button_home} onPress={() => navigation.navigate('Login')}>
                        <Image style={css.img1} source={require('../assets/in.png')} />
                    </TouchableOpacity>
                </View>
                <View style={css.direita}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastros')}>
                        <Image style={css.imagemajuste} source={require('../assets/add-user.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    )
}