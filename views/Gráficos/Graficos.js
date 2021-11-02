//configurações de agendamento: colocar horas trabalhadas por dia => definirá horas disponiveis para cada dia
import React, { Component, useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import { AsyncStorage } from 'react-native';
import config from '../../config/config.json';
import { PieChart } from 'react-native-svg-charts';
Graficos = (id) => {
    const [execucao, setExecucao] = useState(1);
    const [execucao2, setExecucao2] = useState(1);
    const [execucao3, setExecucao3] = useState(1);
    const [listaHumor, setListaHumor] = useState([null]);
    const [listaAtividades, setListaAtividades] = useState([null]);
    const [dias, setDias] = useState([null]);
    const [diasData, setDiasData] = useState([null]);
    const [listaMedicacoes, setListaMedicacoes] = useState([null]);
    const [medicacaoDia, setMedicacaoDia] = useState();
    const [atividadesDia, setAtividadesDia] = useState();
    const [corAtividadeDia, setCorAtividadeDia] = useState('#fff');
    const [checked, setChecked] = useState(false);
    const [dataGraf, setDataGraf] = useState(null);
    //pie
    const [itens, setItens] = useState([]);
    const [atividadesP, setAtividadesP] = useState([]);
    const [atividadesCor, setAtividadesCor] = useState([]);
    const [porcentagemAtt, setPorcentagemAtt] = useState([]);
    const pieData = itens.map((value, index) => ({
        value,
        key: `${index}-${value}`,
        svg: {
            fill: atividadesCor[index]
        }
    }));


    useEffect(() => {
        Medicamentos();
    }, [execucao3]);

    useEffect(() => {
        Atividades();
    }, [execucao2]);

    useEffect(() => {
        getGraficos();
    }, [execucao]);

    async function Medicamentos() {
        let response = await fetch(`${config.urlRoot}listaRemediosAll`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('medicacoesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('medicacoesData');
            const jsonNovo = JSON.parse(response);
            setListaMedicacoes(jsonNovo);
            if (execucao3 < 2) {
                setExecucao3(2);
            }
        }
    }

    async function Atividades() {
        let response = await fetch(`${config.urlRoot}listaAtividadesAll`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('atividadesData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('atividadesData');
            const jsonNovo = JSON.parse(response);
            setListaAtividades(jsonNovo);
            let arr = jsonNovo;
            if (execucao2 < 2) {
                setExecucao2(2);
            } else {
                geraGraficoPizzaAtividades(arr);
            }
        }
    }


    async function getGraficos() {
        let response = await fetch(`${config.urlRoot}graficosHumor`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data
            })

        });
        //obtem resposta do controller
        let json = await response.json();
        if (json === 'error') {
            console.log('error');
        } else {
            // //persistencia dos dados para utilizar na aplicação
            await AsyncStorage.setItem('graficosData', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('graficosData');
            const jsonNovo = JSON.parse(response);
            let arrayList = [];
            arrayList = jsonNovo;
            setListaHumor(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            } else {
                geraGraficoSemanal(arrayList);
            }
        }
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async function geraGraficoPizzaAtividades(arr) {
        let tam1 = arr.length;
        if (tam1 > 0) {
            let ini1;
            if (tam1 - 7 <= 0) {
                ini1 = 0;
            } else {
                ini1 = tam1 - 7;
            }
            let porcentagem = [];
            let cor = [];
            let att = [];
            let index;
            let aux;
            for (let j = ini1; j < tam1; j++) {
                if (att.includes(arr[j].nome) == true) {
                    for (var i = 0; i < att.length; ++i) {
                        if (att[i] == arr[j].nome) {
                            index = i;
                            i = att.length;
                        }
                        aux = porcentagem[index] + 1;
                        porcentagem[index] = aux;
                    }
                } else {
                    att.push(arr[j].nome);
                    porcentagem.push(1);
                    cor.push(getRandomColor());
                }
            }
            let valorPorcentagem = [];
            let tam = porcentagem.length;
            for (let k = 0; k < tam; k++) {
                valorPorcentagem[k] =Math.round((porcentagem[k] / tam1) * 100);
            }
            setItens(porcentagem);
            setAtividadesP(att);
            console.log(valorPorcentagem);
            setAtividadesCor(cor);
            setPorcentagemAtt(valorPorcentagem);
        }
    }


    async function geraGraficoSemanal(arrayList) {
        let tam = arrayList.length;
        let days = [];
        let dataE = [];
        if (tam >= 7) {
            let fim = tam - 7;
            for (let i = fim; i < tam; i++) {

                switch (arrayList[i].humor) {
                    case 1:
                        dataE.push(arrayList[i].emissao);
                        days.push(180);
                        break;
                    case 2:
                        dataE.push(arrayList[i].emissao);
                        days.push(150);
                        break;
                    case 3:
                        dataE.push(arrayList[i].emissao);
                        days.push(120);
                        break;
                    case 4:
                        dataE.push(arrayList[i].emissao);
                        days.push(90);
                        break;
                    case 5:
                        dataE.push(arrayList[i].emissao);
                        days.push(60);
                        break;
                    case 6:
                        dataE.push(arrayList[i].emissao);
                        days.push(30);
                        break;
                    default:
                        console.log(`Sorry, we are out of.`);
                }
            }
            setDias(days);
        } else {

            for (let j = 0; j <= 7; j++) {
                if (j < tam) {
                    switch (arrayList[j].humor) {
                        case 1:
                            dataE.push(arrayList[j].emissao);
                            days.push(180);
                            break;
                        case 2:
                            dataE.push(arrayList[j].emissao);
                            days.push(150);
                            break;
                        case 3:
                            dataE.push(arrayList[j].emissao);
                            days.push(120);
                            break;
                        case 4:
                            dataE.push(arrayList[j].emissao);
                            days.push(90);
                            break;
                        case 5:
                            dataE.push(arrayList[j].emissao);
                            days.push(60);
                            break;
                        case 6:
                            dataE.push(arrayList[j].emissao);
                            days.push(30);
                            break;
                        default:
                            console.log(`Sorry, we are out of.`);
                    }
                } else {
                    days.push(0);
                }

            }
            setDias(days);
            setDiasData(dataE);
        }

    }


    function mostraAtividades(posicao) {
        setChecked(true)
        let tam1 = listaAtividades.length;
        let ini1;
        if (tam1 - 7 <= 0) {
            ini1 = 0;
        } else {
            ini1 = tam1 - 7;
        }
        let tam2 = listaMedicacoes.length;
        let ini2;
        if (tam2 - 7 <= 0) {
            ini2 = 0;
        } else {
            ini2 = tam1 - 7;
        }
        let atividades = '';
        let medicacoes = '';
        let virgula = 0;
        let virgula2 = 0;
        for (let i = ini1; i < tam1; i++) {
            if (listaAtividades[i].data == diasData[posicao]) {
                virgula = virgula + 1;
                if (virgula > 1) {
                    atividades = atividades + ',';
                }
                atividades = atividades + listaAtividades[i].nome;
            }

        }
         for (let i = ini2; i < tam2; i++) {
            if (listaMedicacoes[i].data == diasData[posicao]) {
                virgula2 = virgula2 + 1;
                if (virgula2 > 1) {
                    medicacoes = medicacoes + ',';
                }
                medicacoes = medicacoes + listaMedicacoes[i].nome;
                
            } 
                
        }
        setAtividadesDia(atividades);
        setMedicacaoDia(medicacoes);
        setDataGraf(diasData[posicao])
    }
    return (
        <View>
            {/*<ScrollView>*/}
                {(execucao == 2) ?
                    <View>
                        <View style={{ marginHorizontal: 16, alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 21, marginHorizontal: 10, alignItems: 'center', marginTop: 10 }}>Relatório dos ultimos 7 dias</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#363636', fontWeight: 'bold', fontSize: 18, marginHorizontal: 10, alignItems: 'center', marginBottom: -3 }}>Variação de Humor</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 6 }}>
                                <View style={css.graficocontainer}>
                                    <TouchableOpacity style={css.graficoDia(dias[0], '#00BFFF')} onPress={() => mostraAtividades(0)} onPressIn={() => setCorAtividadeDia('#00BFFF')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(1)} onPressIn={() => setCorAtividadeDia('#FF7F50')} style={css.graficoDia(dias[1], '#FF7F50')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(2)} onPressIn={() => setCorAtividadeDia('orange')} style={css.graficoDia(dias[2], 'orange')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(3)} onPressIn={() => setCorAtividadeDia('#A020F0')} style={css.graficoDia(dias[3], '#A020F0')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(4)} onPressIn={() => setCorAtividadeDia('#FF69B4')} style={css.graficoDia(dias[4], '#FF69B4')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(5)} onPressIn={() => setCorAtividadeDia('green')} style={css.graficoDia(dias[5], 'green')}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => mostraAtividades(6)} onPressIn={() => setCorAtividadeDia('red')} style={css.graficoDia(dias[6], 'red')}></TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'column', marginHorizontal: 10, marginTop: 25, }}>
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/felizao.png')} />
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/felizinho.png')} />
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/normalzinho.png')} />
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/tristinho.png')} />
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/tristao.png')} />
                                    <Image style={{ height: 30, width: 30, marginBottom: 2 }} source={require('../../assets/raiva.png')} />
                                </View>

                            </View>
                            <View style={{ width: 325, height: 3, backgroundColor: '#D3D3D3', marginTop: 3, borderRadius: 10 }}></View>
                            {(checked) ?
                                <View style={{ backgroundColor: corAtividadeDia, paddingHorizontal: 6, marginTop: 6, marginBottom: 6, width: 325 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 19 }}>{dataGraf}</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 19 }}>Atividades realizadas:</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 17 }}>{atividadesDia}</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 19, marginTop: 5 }}>Medicações utilizadas:</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 17 }}>{medicacaoDia}</Text>
                                    <Text onPress={() => setChecked(false)}>Fechar</Text>
                                </View>
                                :
                                <View></View>
                            }

                        </View>
                        <View style={{ marginHorizontal: 16, alignItems: 'center' }}>
                            <Text style={{ color: '#363636', fontWeight: 'bold', fontSize: 18, marginHorizontal: 10, alignItems: 'center', marginBottom: -3, marginTop: 6 }}>Percentual de Atividades realizadas</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 16, alignItems: 'center' }}>
                            <View style={{ height: 250, width: 200, marginTop: 30 }}>
                                <PieChart style={{ height: 150 }} data={pieData}></PieChart>
                            </View>
                            <ScrollView style={{ height: 250, marginTop: 35 }} horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{ justifyContent: 'flex-start', marginTop: 20, alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                                    {atividadesP.map((item, key) => (
                                        <View key={key} style={{ flexDirection: 'column', width: 150, justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <Text style={{ alignSelf: 'center', padding: 5 }}>{item}</Text>
                                            <View style={{}}>
                                                <View style={{ width: '100%' }}>
                                                    <View style={{ backgroundColor: atividadesCor[key], borderRadius: 30 }}>
                                                        <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 3, textAlign: 'center', justifyContent: 'center', textAlignVertical: 'center', width: 120, }}>{porcentagemAtt[key]}%</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    :
                    <View></View>
                }
            {/*</ScrollView>*/}
        </View>


    )
}

export default Graficos;
