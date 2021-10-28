
/*
    -id para chamar agendamentoPaciente
    -nao mostrar horas ocupadas
    -input pr nome
*/
import React, { useState, useEffect, isValidElement } from 'react';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Anotacoes from '../Notas/Anotacoes';
import AnotacoesPaciente from '../Notas/AnotacoesPaciente';
import Humor from '../Humor/humor'

export default function HomePaciente({ navigation }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [tempId, setTempId] = useState(null);
    const [control, setControl] = useState(false)
    const [pacienteId, setPacienteId] = useState(null)
    //pega nome para o bem vindo o
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailDataP');
            let json = JSON.parse(response);
            setName(json.name);
            setEmail(json.email);
            setTempId(json.terapeutaId);
            setPacienteId(json.id);
        }
        getName();
    }, []);

    return (
        <View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity ><Image style={css.SmallIcons} source={require("../../assets/PerfilTerapeuta.png")} /></TouchableOpacity>
                <Text style={css.titulohome}>{name}</Text>
                <View style={{ flexDirection: 'row', marginHorizontal: 37, alignItems: 'center' }}>

                    <View style={{ alignItems: 'center', marginTop: 3, width: 80, height: 80 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('NavegacaoHomePaciente')}>
                            <Image style={{ width: 43, height: 43, marginTop: 3 }} source={require("../../assets/agenda3.png")} />
                        </TouchableOpacity>
                        <Text>Agendar</Text>
                    </View>


                    <View style={{ alignItems: 'center', marginBottom: 3, width: 80, height: 80 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('exercicios')}>
                            <Image style={{ width: 47, height: 47, marginTop: 3 }} source={require("../../assets/exercicios.png")} />
                        </TouchableOpacity>
                        <Text>Exercicios</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 3, width: 80, height: 80 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('NavegacaoAnotacoesPaciente')}>
                            <Image style={{ width: 43, height: 43, marginTop: 3 }} source={require("../../assets/anotaçoes.png")} />
                        </TouchableOpacity>
                        <Text>Anotações</Text>
                    </View>

                </View>
            </View>
            <Humor data={pacienteId} />
        </View>
    );
}