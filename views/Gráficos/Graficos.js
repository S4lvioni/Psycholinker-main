//configurações de agendamento: colocar horas trabalhadas por dia => definirá horas disponiveis para cada dia
import React, { Component,useState, useEffect,useCallback } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Modal,Image,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import { AsyncStorage } from 'react-native';
import config from '../../config/config.json';
Graficos=(id)=>{
    const [execucao, setExecucao] = useState(1);
    const [execucao2, setExecucao2] = useState(1);
    const [listaHumor, setListaHumor] = useState([null]);
    const [dias, setDias] = useState([null]);
    
    useEffect(() => {
        Atividades();
    }, [execucao2]);

    useEffect(() => {
        getGraficos();
    }, [execucao]);

    async function Atividades() {
        let response = await fetch(`${config.urlRoot}listaAtividadesAll`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pacienteId: id.data,
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
            console.log('data' )
            console.log(jsonNovo )
            if (execucao2 < 2) {
                setExecucao2(2);
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
            setListaHumor(jsonNovo);
            if (execucao < 2) {
                setExecucao(2);
            }
        }
    }

   async function geraGraficoSemanal(){
        let tam=listaHumor.length;
        let days=[];
        if(tam>=7){
            let fim=tam-7;
            for(let i=fim;i<tam;i++){
               
                switch (listaHumor[i].humor) {
                    case 1:
                        days.push(180);
                      break;
                    case 2:
                        days.push(150);
                      break;
                    case 3:
                        days.push(120);
                    break;
                    case 4:
                        days.push(90);
                    break;
                    case 5:
                        days.push(60);
                    break;
                    case 6:
                        days.push(30);
                    break;
                    default:
                      console.log(`Sorry, we are out of.`);
                  }
            }
            console.log(days)
            setDias(days);
        }else{
            
            for(let j=0;j<=7;j++){
                if(j<tam){
                    switch (listaHumor[j].humor) {
                        case 1:
                            days.push(180);
                          break;
                        case 2:
                            days.push(150);
                          break;
                        case 3:
                            days.push(120);
                        break;
                        case 4:
                            days.push(90);
                        break;
                        case 5:
                            days.push(60);
                        break;
                        case 6:
                            days.push(30);
                        break;
                        default:
                          console.log(`Sorry, we are out of.`);
                      }
                }else{
                    days.push(0);
                }
                
            }
            console.log(days)
            setDias(days);
        }
    }
    return(
        <View>
            <View>
                <Text>Relatório dos ultimos 7 dias</Text>
            </View>
            {(execucao == 2) ?
                <View>
                    <TouchableOpacity onPress={()=>geraGraficoSemanal()}  ><Text>oi</Text></TouchableOpacity>
                    <View style={{flexDirection:'row' }}>
                        <View style={css.graficoDia(dias[0],'#00BFFF')}></View>
                        <View style={css.graficoDia(dias[1],'yellow')}></View>
                        <View style={css.graficoDia(dias[2],'orange')}></View>
                        <View style={css.graficoDia(dias[3],'#A020F0')}></View>
                        <View style={css.graficoDia(dias[4],'#FF69B4')}></View>
                        <View style={css.graficoDia(dias[5],'green')}></View>
                        <View style={css.graficoDia(dias[6],'red')}></View>
                        <View style={{flexDirection:'column',marginHorizontal:10}}>
                            <Image style={{height:25, width:25}} source={require('../../assets/felizao.png')} />
                            <Image style={{height:25, width:25}} source={require('../../assets/felizinho.png')} />
                            <Image style={{height:25, width:25}} source={require('../../assets/normalzinho.png')} />
                            <Image style={{height:25, width:25}} source={require('../../assets/tristinho.png')} />
                            <Image style={{height:25, width:25}} source={require('../../assets/tristao.png')} />
                            <Image style={{height:25, width:25}} source={require('../../assets/raiva.png')} />
                        </View>
                    </View>
                </View>
            :
                    <View></View>
            }
            
            
        </View>
        
        
    )
}

export default Graficos;
