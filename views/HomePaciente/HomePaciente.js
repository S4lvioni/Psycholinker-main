
/*
    -id para chamar agendamentoPaciente
    -nao mostrar horas ocupadas
    -input pr nome
*/
import React, { useState, useEffect, isValidElement } from 'react';
import { AsyncStorage } from 'react-native';
import { css } from '../../assets/CSS/css';
import { Text, View, Button } from 'react-native';
import Anotacoes from '../Notas/Anotacoes';
import AgendamentoPaciente from '../Agendamento/AgendamentoPaciente';
import AnotacoesPaciente from '../Notas/AnotacoesPaciente';
import Humor from '../Humor/humor'


export default function HomePaciente({ HomePaciente }) {
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
            <Text style={css.titulohome}>Bem vindo(a), {name}</Text>
            {/*<AgendamentoPaciente />
            <AnotacoesPaciente />*/}
            <Humor data={pacienteId} />
            {/*<View><AgendamentoPaciente data={tempId} /></View>*/}

        </View>
    );
}