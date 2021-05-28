import React from 'react';
import {Text, View,TouchableOpacity,Image} from 'react-native';
import { css } from '../assets/CSS/css';

export default function Home({navigation})
{

    return(
        
            <View style={css.container2}>
                <TouchableOpacity style={css.button_home} onPress={()=> navigation.navigate('Login')}>
                    <Image style={css.img1} source={require('../assets/free-user-login-icon-305-thumb.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('HomePaciente')}>
                        <Image style={css.img1} source={require('../assets/home--v5.png')}/>
                 </TouchableOpacity>
            </View>
            
      
    )
}