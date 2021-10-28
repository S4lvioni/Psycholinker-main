import React, { Component, useState, setState, useEffect } from 'react'
import { useCallback } from 'react';
import config from '../../config/config.json';
import { AsyncStorage, FlatList, Pressable} from 'react-native';
import { css } from '../../assets/CSS/css.js';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TextInput,
    Platform,
    RefreshControl,
    Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';


Humor = (id) => {
    const [humor, setHumor] = useState(null)
    const [texto, setTexto] = useState('')
    const [text, setText] = useState('')
    const [complete, setComplete] = useState(false)
    const [medicacao, setMedicacao] = useState('')
    const [atividade, setAtividade] = useState('')
    const [atividadeR, setAtividadeR] = useState([
        {
            nome: null, id: '1'
        }
    ])
    const [atividades, setAtividades] = useState([
        {
            nome: null, id: '1'
        }
    ])
    const [medicamentos, setMedicamentos] = useState([
        {
            nome: null, id: '1'
        }
    ])
    const [atividadesSelecionadas, setAtividadesSelecionadas] = useState([
        {
            nome: null, id: '1', dia: null
        }
    ])
    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([
        {
            nome: null, id: '1', dia: null
        }
    ])
    const pacienteId = id.data
    //DATA

    const [diaSelecionado, setDiaSelecionado] = useState(0);
    const [datafull, setDatafull] = useState(0)
    const [dataCorrigida, setDataCorrigida] = useState(0)

    useEffect(() => {
        let today = new Date();
        setAno(today.getFullYear());
        setMes(today.getMonth() + 1);
        setDia(today.getDate());
        let mesCerto = today.getMonth() + 1
        setDatafull(today.getFullYear() + '/' + mesCerto + '/' + today.getDate())
        setDataCorrigida(today.getDate() + '/' + mesCerto + '/' + today.getFullYear())
    }, []);

    const [ano, setAno] = useState(0);
    const [mes, setMes] = useState(0);
    const [dia, setDia] = useState(0);

    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState('');
    const [modalVisible2, setModalVisible2] = useState('')
    const [execucao, setExecucao] = useState(1);
    const [exister, setExister] = useState(0)

    useEffect(() => {
        relatorioExiste();
    }, [execucao]);


    useEffect(() => {
        gerenciaAtividades();
    }, [execucao]);

    useEffect(() => {
        gerenciaMedicamentos();
    }, [execucao]);

    useEffect(() => {
        gerenciaAtividadesSelecionadas();
    }, [execucao]);

    useEffect(() => {
        gerenciaMedicamentosSelecionados();
    }, [execucao]);

    //pega as atividades do banco
    async function gerenciaAtividades() {
        let response = await fetch(`${config.urlRoot}listaAtividades`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
                nome: atividade
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('AtividadesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('AtividadesData');
            const jsonNovo = JSON.parse(response);
            setAtividades(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }


    async function gerenciaMedicamentos() {
        let response = await fetch(`${config.urlRoot}listaMedicamentos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
                nome: medicacao
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('MedicamentosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('MedicamentosData');
            const jsonNovo = JSON.parse(response);
            setMedicamentos(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }

    async function relatorioExiste() {
        let response = await fetch(`${config.urlRoot}relatorioExiste`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emissao: dataCorrigida,
                pacienteId: pacienteId
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('existeRelatorioData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('existeRelatorioData');
            const jsonNovo = JSON.parse(response);
            setExister(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
            console.log(jsonNovo)
        }

    }

    //pega as atividades do banco
    async function gerenciaAtividadesSelecionadas() {
        let response = await fetch(`${config.urlRoot}listaAtividadesSelecionadasPaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
                nome: atividade,
                dia: dia,
                mes: mes,
                ano: ano
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('AtividadesSelecionadasData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('AtividadesSelecionadasData');
            const jsonNovo = JSON.parse(response);
            setAtividadesSelecionadas(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
            console.log(dia);
        }
    }



    async function gerenciaMedicamentosSelecionados() {
        let response = await fetch(`${config.urlRoot}listaMedicamentosSelecionadosPaciente`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
                nome: medicacao,
                dia: dia,
                mes: mes,
                ano: ano
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('MedicamentosSelecionadosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('MedicamentosSelecionadosData');
            const jsonNovo = JSON.parse(response);
            setMedicamentosSelecionados(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
            console.log('Oi');
        }
    }



    //insere nova atividade no banco
    async function salvarAtividade() {
        let response = await fetch(config.urlRoot + 'createActivity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: atividade,
                pacienteId: id.data
            }),
        });
        gerenciaAtividades();
    }


    async function salvarMedicamento() {
        let response = await fetch(config.urlRoot + 'createMed', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: medicacao,
                pacienteId: id.data
            }),
        });
        gerenciaMedicamentos()
    }

    async function salvarRelatorio() {
        let response = await fetch(config.urlRoot + 'createReport', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                humor: humor,
                pacienteId: id.data,
                texto: texto,
                emissao: dataCorrigida
            }),
        });
        relatorioExiste();
    }
    async function atividadeRelatorio(nome, id) {
        let response = await fetch(config.urlRoot + 'createSelectedActivity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                id: id,
                dia: dia,
                mes: mes,
                ano: ano,
                pacienteId: pacienteId,
                data: dataCorrigida
            }),
        });
        console.log(datafull)
        gerenciaAtividadesSelecionadas()
    }


    async function medicamentoRelatorio(nome, id) {
        let response = await fetch(config.urlRoot + 'createSelectedMed', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                id: id,
                dia: dia,
                mes: mes,
                ano: ano,
                pacienteId: pacienteId,
                data: dataCorrigida
            }),
        });
        gerenciaMedicamentosSelecionados();
    }


    function ListaMedicamentos({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <Text style={estilo.observacoescontainer}>
                        <Pressable style={estilo.botaoreport} onPress={() => medicamentoRelatorio(nome, id)}>
                            <Text style={estilo.observacoeslista}>{nome}{id}</Text>
                        </Pressable>

                    </Text>
                </View >
            )
        } else {
            return (null);
        }
    }


    function ListaAtividades({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <Text style={estilo.observacoescontainer}>
                        <Pressable style={estilo.botaoreport} onPress={() => atividadeRelatorio(nome, id)}>
                            <Text style={estilo.observacoeslista}>{nome}{id}</Text>
                        </Pressable>

                    </Text>
                </View >
            )
        } else {
            return (null);
        }
    }

    function ListaAtividadesSelecionadas({ nome, id }) {
        if (nome != null) {
            return (
                <View>
                    <Text style={estilo.observacoescontainer}>
                        <Text style={estilo.observacoeslista}>{nome}{id}</Text>
                    </Text>
                </View >
            )
        } else {
            return (null);
        }
    }


    function ListaMedicamentosSelecionadas({ nome, id }) {
        if (nome != null) {
            return (
                <View>
                    <Text style={estilo.observacoescontainer}>
                        <Text style={estilo.observacoeslista}>{nome}{id}</Text>
                    </Text>
                </View >
            )

        } else {
            return (null);
        }
    }


    return (
        <View>
            { (exister) ?
                <View>
            
                        <View style={estilo.imagemContainer}>
                            <TouchableOpacity
                                onPress={() => setHumor(1)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/felizao.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setHumor(2)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/felizinho.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setHumor(3)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/normalzinho.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setHumor(4)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/tristinho.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setHumor(5)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/tristao.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setHumor(6)}>
                                <View>
                                    <Image style={estilo.imagem}
                                        source={require('../../assets/raiva.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={{ marginLeft: 5 }}
                            multiline={true}
                            placeholder="Insira sua nota:"
                            onChangeText={text => setTexto(text)}
                            defaultValue={text} />
                        <Text>{humor}{texto}</Text>

                        <Text>Insira seus medicamentos:</Text>
                        <TouchableOpacity style={estilo.button_login} onPress={() => setModalVisible(true)}><Text style={estilo.button_login_text}>+</Text></TouchableOpacity>
                        <View style={estilo.modalsize}>
                            <Modal
                                style={estilo.modalcontent}
                                animationType="slide"
                                visible={modalVisible}>

                                <View>
                                    <TextInput
                                        style={{ marginLeft: 5 }}
                                        multiline={true}
                                        placeholder="Medicacao:"
                                        onChangeText={text => setMedicacao(text)}
                                        defaultValue={text} />

                                    <View style={estilo.containerquit}>
                                        <Pressable
                                            onPress={() => setModalVisible(false)}>
                                            <Text>Sair!</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => salvarMedicamento()}>
                                            <Text>Inserir medicação</Text>
                                        </Pressable>
                                    </View>
                                    <Text> Seus medicamentos cadastradas:</Text>
                                    <FlatList style={estilo.lista2}
                                        data={medicamentos}
                                        renderItem={({ item }) => <ListaMedicamentos nome={item.nome} id={item.id} />}
                                        keyExtractor={item => item.id.toString()}
                                        extraData={refresh}
                                    />
                                </View>
                            </Modal>
                            <Text> Insira suas atividades:</Text>
                            <TouchableOpacity style={estilo.button_login} onPress={() => setModalVisible2(true)}><Text style={estilo.button_login_text}>+</Text></TouchableOpacity>
                            <Modal
                                style={estilo.modalcontent}
                                animationType="slide"
                                visible={modalVisible2}>

                                <View>
                                    <Text>Insira uma nova atividade:</Text>
                                    <TextInput
                                        style={{ marginLeft: 5 }}
                                        multiline={true}
                                        placeholder="Atividade:"
                                        onChangeText={text => setAtividade(text)}
                                        defaultValue={text} />
                                    <Pressable
                                        onPress={() => salvarAtividade()}>
                                        <Text>Inserir</Text>
                                    </Pressable>


                                    <Text> Suas atividades cadastradas:</Text>
                                    <FlatList style={estilo.lista2}
                                        data={atividades}
                                        renderItem={({ item }) => <ListaAtividades nome={item.nome} id={item.id} dia={item.dia} />}
                                        keyExtractor={item => item.id.toString()}
                                        extraData={refresh}
                                    />
                                    <View style={estilo.containerquit}>
                                        <Pressable
                                            onPress={() => setModalVisible2(false)}>
                                            <Text>Sair!</Text>
                                        </Pressable>

                                    </View>
                                </View>
                            </Modal>
                            <FlatList style={estilo.lista2}
                                data={atividadesSelecionadas}
                                renderItem={({ item }) => <ListaAtividadesSelecionadas nome={item.nome} id={item.id} />}
                                keyExtractor={item => item.id.toString()}
                                extraData={refresh}
                            />

                            <FlatList style={estilo.lista2}
                                data={medicamentosSelecionados}
                                renderItem={({ item }) => <ListaMedicamentosSelecionadas nome={item.nome} id={item.id} />}
                                keyExtractor={item => item.id.toString()}
                                extraData={refresh}
                            />
                            <Pressable
                                onPress={() => salvarRelatorio()}>
                                <Text>Enviar relatório</Text>
                            </Pressable>

                        </View>
           
                </View>
                :
                <View><Text>Finalizado!</Text></View>}
        </View>

    )
}


const estilo = StyleSheet.create({
    imagem: {
        width: 60,
        height: 60
    },
    imagemContainer: {
        flexDirection: 'row'
    },
    containerquit: {
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-around'
    },
    botaoreport: {
        backgroundColor: 'red'
    },
    button_login: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#FFB6C1',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_login_text: {
        marginBottom: 3,
        fontSize: 25
    }

})
export default Humor