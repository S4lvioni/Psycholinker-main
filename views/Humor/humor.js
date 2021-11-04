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
import { render } from 'react-dom';


Humor = (id) => {
    const [humor, setHumor] = useState(null);
    const [texto, setTexto] = useState('');
    const [text, setText] = useState('');
    const [complete, setComplete] = useState(false);
    const [medicacao, setMedicacao] = useState('');
    const [atividade, setAtividade] = useState('');
    const [coresAtividades, setCoresAtividades] = useState([])
    const [humorTexto, setHumorTexto] = useState(null);
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

    function putColor2(id){
        let selecionados=[];
        selecionados=coresAtividades;
        selecionados.push(id);
        setCoresAtividades(selecionados);
    }

    function checkColor2(id){
        if(coresAtividades.includes(id)==true){
            return true;
        }else{
            return false;
        }
    }

    function ListaMedicamentos({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <Text style={{}}>
                        <Pressable style={{borderRadius:10, padding:3,backgroundColor:checkColor2(id)==true ? '#ffcbdb':'#FFFFFF',}} onPress={() => medicamentoRelatorio(nome, id)}onPressIn={()=>putColor(id)}>
                            <Text style={{color:'#000',fontWeight:'bold', fontSize:15}}>{nome}</Text>
                        </Pressable>

                    </Text>
                </View >
            )
        } else {
            return (null);
        }
    }

    function putColor(id){
        let selecionados=[];
        selecionados=coresAtividades;
        selecionados.push(id);
        setCoresAtividades(selecionados);
    }

    function checkColor(id){
        if(coresAtividades.includes(id)==true){
            return true;
        }else{
            return false;
        }
    }
    function ListaAtividades({ nome, id }) {

        if (nome != null) {
            return (
                <View>
                    <Text style={{marginHorizontal:3}}>
                        <Pressable style={{borderRadius:10, padding:3,backgroundColor:checkColor(id)==true ? '#ffcbdb':'#FFFFFF',}} onPress={() => atividadeRelatorio(nome, id) }  onPressIn={()=>putColor(id)}>
                            <Text 
                            style={{color:'#000',fontWeight:'bold', fontSize:15   }}>
                                {nome}</Text>
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
                <View style={{marginHorizontal:25}}>
            
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
                        <View style={{alignItems:'center'}}>
                        {(humor ==1 )?
                            <View>
                                <Text>Muito feliz!</Text>
                            </View>
                            :(humor == 2)?
                            <View>
                                <Text>Feliz!</Text>
                            </View>
                            :(humor ==3)?
                            <View>
                                <Text>Ok</Text>
                                </View>
                                :(humor ==4)?
                                <View>
                                    <Text>Chateado</Text>
                                    </View>
                                    :(humor ==5)?
                                    <View>
                                        <Text>Triste</Text>
                                    </View>
                                    :(humor ==6)?
                                    <View>
                                        <Text>Enraivecido</Text>
                                        </View>
                                        :
                                        <View>
                                            </View>
                        }
                            </View>
                        <View style={{flexDirection:'row', marginTop:15, marginBottom:8,}}>
                        <Image style={{width:40, height:40, marginTop:20}}
                                        source={require('../../assets/relatorio.png')} />
                            <TextInput
                                style={{ marginLeft: 5, marginBottom:5, marginTop:20, fontSize:17 }}
                                multiline={true}
                                placeholder="Insira sua nota:"
                                onChangeText={text => setTexto(text)}
                                defaultValue={text} />
                            
                        </View>
                        <Text style={{marginTop:10}}>Insira seus medicamentos:</Text>
                        <View style={{alignItems:'flex-start', marginTop:10, marginBottom:10}} >
                        <TouchableOpacity style={estilo.button_login } onPress={() => setModalVisible(true)}><Text style={estilo.button_login_text}>+</Text></TouchableOpacity></View>
                        <View style={estilo.modalsize}>
                            <Modal
                                style={estilo.modalcontent}
                                animationType="slide"
                                visible={modalVisible}>
                                <View style={{alignItems:'flex-end'}}>
                                    <Pressable style={{marginTop:6,backgroundColor:'#fff', borderRadius:100, width:20, height:20,justifyContent:'center',alignItems:'center',marginHorizontal:6}}><Text style={{fontWeight:'bold',color:'#000',fontSize:20}}     onPress={() => setModalVisible(false)}>x</Text></Pressable>
                                </View>      
                                <Text style={{marginTop:10,fontSize:17, marginBottom:8, marginLeft:15}}> Seus medicamentos cadastradas:</Text>
                                 <ScrollView style={{ marginHorizontal:10}}>
                                 <FlatList style={estilo.lista2}
                                        numColumns={4}
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={medicamentos}
                                        renderItem={({ item }) => <ListaMedicamentos nome={item.nome} id={item.id} />}
                                        keyExtractor={item => item.id.toString()}
                                        extraData={refresh}
                                    />
                                    <Text style={{marginTop:30,fontSize:17, marginBottom:8,marginHorizontal:10}}>Insira uma nova medicação:</Text>
                                <View style={{ marginHorizontal:10}}>
                                    <TextInput
                                        style={{ marginLeft: 5 }}
                                        multiline={true}
                                        placeholder="Medicacao:"
                                        onChangeText={text => setMedicacao(text)}
                                        defaultValue={text} />

                                    <View style={estilo.containerquit}>
                                        <Pressable
                                            style={css.login_button_modified}
                                            onPress={() => salvarMedicamento()}>
                                            <Text style={css.login_button_Texto}>Inserir</Text>
                                        </Pressable>
                                        
                                    </View>
                                    <Pressable
                                        style={css.login_button_modified}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={css.login_button_Texto} >Salvar</Text>
                                    </Pressable>
                                </View>
                                </ScrollView>
                                    
                            </Modal>
                            <Text>Inserir nova atividade:</Text>
                            <View style={{alignItems:'flex-start', marginTop:10, marginBottom:10}}>
                            <TouchableOpacity style={estilo.button_login} onPress={() => setModalVisible2(true)}><Text style={estilo.button_login_text}>+</Text></TouchableOpacity></View>
                            <Modal
                                style={estilo.modalcontent}
                                animationType="slide"
                                visible={modalVisible2}>
                                <View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Pressable style={{marginTop:6,backgroundColor:'#fff', borderRadius:100, width:20, height:20,justifyContent:'center',alignItems:'center',marginHorizontal:6}}><Text style={{fontWeight:'bold',color:'#000',fontSize:20}}   onPress={() => setModalVisible2(false)}>x</Text></Pressable>
                                </View>        
                                        <View>
                                        <ScrollView style={{ marginHorizontal:10}}>
                                            <Text style={{marginTop:10,fontSize:17, marginBottom:8}}>Selecione atividades:</Text>
                                                <FlatList style={estilo.lista2}
                                                    numColumns={4}
                                                    showsVerticalScrollIndicator={false}
                                                    showsHorizontalScrollIndicator={false}
                                                    data={atividades}
                                                    renderItem={({ item }) => <ListaAtividades nome={item.nome} id={item.id} dia={item.dia} />}
                                                    keyExtractor={item => item.id.toString()}
                                                    extraData={refresh}
                                                />
                                        </ScrollView >
                                        <Text style={{marginTop:10,fontSize:17, marginBottom:8,marginHorizontal:10}}>Insira uma nova atividade:</Text>
                                        <View style={{ marginHorizontal:10, flexDirection:'row'}}>
                                                <TextInput
                                                    style={{ marginLeft: 5 }}
                                                    multiline={true}
                                                    placeholder="Atividade:"
                                                    onChangeText={text => setAtividade(text)}
                                                    defaultValue={text} />
                                                <Pressable
                                                style={{backgroundColor:'#ffcbdb', marginHorizontal:30, borderRadius:20, width:60, alignItems:'center',justifyContent:'center', }}
                                                    onPress={() => salvarAtividade()}>
                                                    <Text style={{fontWeight:'bold'}}>Inserir</Text>
                                                </Pressable>
                                        </View>

                                        </View>
                                </View>
                                    <Pressable
                                        style={css.login_button_modified}
                                        onPress={() => setModalVisible2(false)}
                                    >
                                        <Text style={css.login_button_Texto} >Salvar</Text>
                                    </Pressable>
                            </Modal>
                            <View style={{alignItems:'center',justifyContent:'center', marginTop:30}}>
                                <Pressable
                                style={{backgroundColor:'#ffcbdb', marginHorizontal:30, borderRadius:20, width:120, alignItems:'center',justifyContent:'center', height:30}}
                                    onPress={() => salvarRelatorio()}>
                                    <Text>Enviar Relatório</Text>
                                </Pressable>
                            </View>
                          

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
        backgroundColor: '#ffcbdb',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_login_text: {
        marginBottom: 3,
        fontSize: 25
    },
    lista2:{
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignSelf:'flex-start',
        marginLeft:10
    },
    observacoescontainer:{
        flexWrap: 'wrap'
    }

})
export default Humor