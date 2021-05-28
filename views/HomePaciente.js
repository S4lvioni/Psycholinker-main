import React from 'react';
import {Text, View, Button} from 'react-native';

export default function HomePaciente({HomePaciente}) {

    return (
        <View>
            <Text>Seleciona seu humor</Text>
            <Button
                    title='Ir para Login'
                    onPress={() => navigation.navigate('Login',{
                    id: 30
                })}
            />
        </View>
    );
}