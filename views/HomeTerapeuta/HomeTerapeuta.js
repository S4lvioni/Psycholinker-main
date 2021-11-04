import React, { useState, useEffect, Component } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, Pressable, Image,ImageBackground } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import config from '../../config/config.json';
import AgendamentoTerapeuta from '../Agendamento/AgendamentoTerapeuta';
import AgendamentoConfig from '../Agendamento/AgendamentoConfig';
import HumorTerapeuta from '../Humor/humorTerapeuta';
import { set } from 'react-native-reanimated';
const backgroundimg = require( '../../assets/gradientcontrario.png')

export default function HomeTerapeuta({ navigation }) {
    //variaveis de controle
    const [execucao, setExecucao] = useState(1);
    const [atualiza,setAtualiza]= useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [display, setDisplay] = useState('none');
    const [display2, setDisplay2] = useState('none');
    //terapeuta
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    //criar paciente
    const [code, setCode] = useState(null);
    const [codeA, setCodeA] = useState(null);
    const [terapeutaId, setTerapeuta] = useState(null);
    //listagem
    const [pacientes, setPacientes] = useState([
        {
            name: null, id: '1', telefone: null, email: null
        }
    ]);
    //edit paciente
    const [pacienteId, setpacienteId] = useState(null);
    const [pacienteName, setpacienteName] = useState(null);
    const [pacienteTelefone, setpacienteTelefone] = useState(null);
    const [pacienteEmail, setpacienteEmail] = useState(null);
    const [response, setResponse] = useState(null);
    //horas
    const [horasconf, setHorasConf] = useState(null);

    useEffect(() => {
        randomCode();
    }, []);

    useEffect(() => {
        getTerapeuta();
    }, []);

    useEffect(() => {
        gerenciaPaciente();

    }, [execucao]);

    //pega nome para o bem vindo o
    useEffect(() => {
        async function getName() {
            let response = await AsyncStorage.getItem('emailData');
            let json = JSON.parse(response);
            setName(json.name);
            setEmail(json.email);
            setHorasConf(json.horasconf);
        }
        getName();
    }, []);

    async function gerenciaPaciente() {
        let response = await fetch(`${config.urlRoot}listaPaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terapeutaId: terapeutaId
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('pacientesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('pacientesData');
            const jsonNovo = JSON.parse(response);
            setPacientes(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }
    async function onEdit(id, nome, email, telefone) {
        /*
*/
        setpacienteName(nome)
        setpacienteId(id);
        setModalVisible(true)
        setpacienteEmail(email)
        setpacienteTelefone(telefone)

    }


    async function editData() {

        let response = await fetch(config.urlRoot + 'editPaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: pacienteId,
                name: pacienteName,
                email: pacienteEmail,
                telefone: pacienteTelefone
            })
        });

    }

    async function onDelete(id) {
        let response = await fetch(config.urlRoot + 'deletePaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        let json = await response.json();
        setAtualiza(true);
    }


    //Pegar o id do Terapeuta
    async function getTerapeuta() {
        let response = await AsyncStorage.getItem('emailData');
        let json = JSON.parse(response);
        setTerapeuta(json.id);
    }

    //Gerar um código randômico
    //Em caso de uso real fazer alterações de segurança**
    function randomCode() {
        let result = '';
        let length = 5;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        setCode(result);
        setDisplay2('flex');
        setTimeout(() => {
            setDisplay2('none');
        }, 10000);
    }
    //Envio do formulário
    async function sendForm() {
        randomCode();
        setCodeA(code);
        let response = await fetch(config.urlRoot + 'createCodPaciente', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                terapeutaId: terapeutaId,
                code: code
            }),

        });
    }

    //pegar o nome e id de cada paciente para abrir no perfil
    async function openPerfilPaciente(id, nome) {

        let response = await fetch(`${config.urlRoot}perfilpaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                id: id
            })
        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            setDisplay('flex');
            setTimeout(() => {
                setDisplay('none');
            }, 5000);
            await AsyncStorage.clear();
        } else {
            //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('emailDataP', JSON.stringify(json));//json é  a resposta
        }
        navigation.navigate('Perfil');
    }



    function ListaPaciente({ nome, id, email, telefone }) {

        if (nome != null) {
            return (
                <View style={{ flexDirection: "row", marginBottom: 5, paddingHorizontal:5 , width: '100%', borderWidth:2, backgroundColor:' rgba(255,255,255,0.5)', height:50, justifyContent:'center', alignItems:'center', borderRadius:18, borderColor:'#c87ee9' }}>
                    
                        <TouchableOpacity
                            style={{ flexDirection: "row" }}
                            onPress={() => openPerfilPaciente(id, nome)}>
                            <Image style={{ width: 30, height: 30, justifyContent: 'flex-start', marginRight: 6 }} source={require("../../assets/PerfilTerapeuta.png")} />
                            <Text style={css.nomepacientehometerapeuta}>{nome}</Text>
                        </TouchableOpacity>
                    
                    <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 0 ,marginRight:15}}>
                            <TouchableOpacity onPress={() => onEdit(id, nome, email, telefone)}  ><Image style={{ width: 30, height: 30, marginRight: 5, justifyContent: 'flex-end' }} source={require("../../assets/editar.png")} /></TouchableOpacity>
                            <TouchableOpacity  onPressIn={()=> setAtualiza(false)} onPress={() => onDelete(id)}  ><Image style={{ width: 30, height: 30, justifyContent: 'flex-end' }} source={require("../../assets/excluir.png")} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (null);
        }

    }
    async function closeUpdate() {
        gerenciaPaciente();
        setModalVisible(false);
    }
    //teste
    async function navigateExercicio() {
        navigation.navigate('exercicios');
    }
    return (

        <View style={{flex:1, backgroundColor:'#fff' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity ><Image style={css.SmallIcons} source={require("../../assets/PerfilTerapeuta.png")} /></TouchableOpacity>

                    <Text style={css.titulohome}>{name}</Text>
                </View>

                <View>
                    {(execucao == 2||atualiza==true) ?
                            <View style={css.Listas}>
                               
                                    <View style={{ backgroundColor: '#FFB6C1' }}>
                                        <Text style={css.titulohome}>Lista de Pacientes</Text>
                                    </View>
                                    <ScrollView style={{height:200}}>
                                        <SafeAreaView style={css.container3}>
                                            <FlatList
                                                data={pacientes}
                                                renderItem={({ item }) => <ListaPaciente nome={item.name} id={item.id} email={item.email} telefone={item.telefone} />}
                                                keyExtractor={item => item.id.toString()}
                                                extraData={refresh}
                                            />
                                        </SafeAreaView>
                                </ScrollView>
                            </View> 
                        :
                        <View>
                        </View>
                    }
                    <View>
                        <Modal
                            animationType="slide"
                            visible={modalVisible}
                        >

                            <View style={css.containeredit}>
                                <Text>{pacienteName}</Text>
                                <View style={css.inputes}>
                                    <Text>Nome:</Text>
                                    <TextInput
                                        style={css.alturalinha}
                                        placeholder='Nome:'
                                        onChangeText={text => setpacienteName(text)}
                                        value={pacienteName}
                                    />
                                </View>
                                <View style={css.inputes}>
                                    <Text>Email:</Text>
                                    <TextInput
                                        style={css.alturalinha}
                                        onChangeText={text => setpacienteEmail(text)}
                                        value={pacienteEmail}
                                    />
                                </View>
                                <View style={css.inputes}>
                                    <Text>Telefone:</Text>
                                    <TextInput
                                        style={css.alturalinha}
                                        onChangeText={text => setpacienteTelefone(text)}
                                        value={pacienteTelefone}
                                    />
                                </View>
                                <View style={css.containerbuttonedit}>
                                    <Pressable
                                        style={css.login_button_modified}
                                        onPressIn={() => editData()}
                                        onPress={() => closeUpdate()}
                                    >
                                        <Text style={css.login_button_Texto} >Salvar</Text>
                                    </Pressable>
                                    <Pressable
                                        style={css.login_button_modified}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={css.login_button_Texto}>Sair</Text>
                                    </Pressable>
                                </View>
                            </View>

                        </Modal>
                    </View>

                </View>
                <View style={{ alignItems: 'center', height: 62 }}>
                    <Text style={css.login__msg(display2)}>{codeA}</Text>
                </View>
                <View style={{width: '100%', backgroundColor:'#fff'}}>
                    <View style={{marginHorizontal:25, flexDirection: 'row', alignItems: 'center', marginBottom:3, justifyContent:'center', height:'65%'}}>
                        <View style={{ width: 80, height: 80,marginHorizontal:5 }}>
                            <AgendamentoConfig data={terapeutaId} />
                        </View>

                        <View style={{ alignItems: 'center', width: 80, height: 80,marginHorizontal:5 }}>
                            <TouchableOpacity style={css.SmallButtons} onPress={() => sendForm()}>
                                <Text style={css.SmallButtonsText}>+</Text>
                            </TouchableOpacity>
                            <Text>Novo</Text>
                            <Text style={{ marginTop: -3 }}>Paciente</Text>
                        </View>

                        <View style={{ alignItems: 'center', width: 80, height: 80,marginHorizontal:5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Agenda')}>
                                <Image style={{ width: 43, height: 43, marginTop: 3 }} source={require("../../assets/agenda3.png")} />
                            </TouchableOpacity>
                            <Text>Agendar</Text>
                            <Text style={{ marginTop: -3 }}>Paciente</Text>
                        </View>


                        <View style={{ alignItems: 'center', marginBottom:0, width: 80, height: 80,marginHorizontal:5 }}>
                            <TouchableOpacity onPress={() => navigateExercicio()}>
                                <Image style={{ width: 47, height: 47, marginTop: 3 }} source={require("../../assets/exercicios.png")} />
                            </TouchableOpacity>
                            <Text>Exercicios</Text>
                        </View>
                    </View>    
                </View>  
        </View>
        
    );
}