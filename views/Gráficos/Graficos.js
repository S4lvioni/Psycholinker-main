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
    const [execucao3, setExecucao3] = useState(1);
    const [listaHumor, setListaHumor] = useState([null]);
    const [listaAtividades, setListaAtividades] = useState([null]);
    const [dias, setDias] = useState([null]);
    const [diasData, setDiasData] = useState([null]);
    const [listaMedicacoes, setListaMedicacoes] = useState([null]);
    const [medicacaoDia, setMedicacaoDia] = useState();
    const [atividadesDia, setAtividadesDia] = useState();
    const [corAtividadeDia, setCorAtividadeDia] = useState('#fff');
    
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
            console.log(jsonNovo);
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
        let dataE=[];
        if(tam>=7){
            let fim=tam-7;
            for(let i=fim;i<tam;i++){
               
                switch (listaHumor[i].humor) {
                    case 1:
                        dataE.push(listaHumor[i].emissao);
                        days.push(180);
                      break;
                    case 2:
                        dataE.push(listaHumor[i].emissao);
                        days.push(150);
                      break;
                    case 3:
                        dataE.push(listaHumor[i].emissao);
                        days.push(120);
                    break;
                    case 4:
                        dataE.push(listaHumor[i].emissao);
                        days.push(90);
                    break;
                    case 5:
                        dataE.push(listaHumor[i].emissao);
                        days.push(60);
                    break;
                    case 6:
                        dataE.push(listaHumor[i].emissao);
                        days.push(30);
                    break;
                    default:
                      console.log(`Sorry, we are out of.`);
                  }
            }
            setDias(days);
        }else{
            
            for(let j=0;j<=7;j++){
                if(j<tam){
                    switch (listaHumor[j].humor) {
                        case 1:
                            dataE.push(listaHumor[j].emissao);
                            days.push(180);
                          break;
                        case 2:
                            dataE.push(listaHumor[j].emissao);
                            days.push(150);
                          break;
                        case 3:
                            dataE.push(listaHumor[j].emissao);
                            days.push(120);
                        break;
                        case 4:
                            dataE.push(listaHumor[j].emissao);
                            days.push(90);
                        break;
                        case 5:
                            dataE.push(listaHumor[j].emissao);
                            days.push(60);
                        break;
                        case 6:
                            dataE.push(listaHumor[j].emissao);
                            days.push(30);
                        break;
                        default:
                          console.log(`Sorry, we are out of.`);
                      }
                }else{
                    days.push(0);
                }
                
            }
            setDias(days);
            setDiasData(dataE);
        }
    }

    function mostraAtividades(posicao){
        let tam1=listaAtividades.length;
        let tam2=listaMedicacoes.length;
        let atividades='';
        let medicacoes='';
        let virgula=0;
        let virgula2=0;
        for(let i=0;i<tam1;i++){
          if(listaAtividades[i].data==diasData[posicao]){
            virgula=virgula+1;
            if(virgula>1){
                atividades=atividades+',';
            }
            atividades=atividades+listaAtividades[i].nome;
          }
            
        }
        for(let i=0;i<tam2;i++){
            if(listaMedicacoes[i].data==diasData[posicao]){
                virgula2=virgula2+1;
                if(virgula2>1){
                    medicacoes=medicacoes+',';
                }
                medicacoes=medicacoes+listaMedicacoes[i].nome;
    
              }

        }
        setAtividadesDia(atividades);
        setMedicacaoDia(medicacoes);
    }
    return(
        <View>
            <View>
                <Text>Relatório dos ultimos 7 dias</Text>
            </View>
            {(execucao == 2) ?
                <View>
                    <View style={{backgroundColor:'#fff', marginHorizontal:16}}>
                        <TouchableOpacity onPress={()=>geraGraficoSemanal()}  ><Text>Mostrar Gráficos</Text></TouchableOpacity>
                        <View style={{flexDirection:'row',paddingHorizontal:6 }}>
                            <TouchableOpacity  style={css.graficoDia(dias[0],'#00BFFF')}onPress={()=>mostraAtividades(0)} onPressIn={()=>setCorAtividadeDia('#00BFFF')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(1)} onPressIn={()=>setCorAtividadeDia('#FF7F50')} style={css.graficoDia(dias[1],'#FF7F50')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(2)} onPressIn={()=>setCorAtividadeDia('orange')} style={css.graficoDia(dias[2],'orange')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(3)} onPressIn={()=>setCorAtividadeDia('#A020F0')} style={css.graficoDia(dias[3],'#A020F0')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(4)} onPressIn={()=>setCorAtividadeDia('#FF69B4')} style={css.graficoDia(dias[4],'#FF69B4')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(5)} onPressIn={()=>setCorAtividadeDia('green')} style={css.graficoDia(dias[5],'green')}></TouchableOpacity>
                            <TouchableOpacity onPress={()=>mostraAtividades(6)} onPressIn={()=>setCorAtividadeDia('red')} style={css.graficoDia(dias[6],'red')}></TouchableOpacity>
                            <View style={{flexDirection:'column',marginHorizontal:10, }}>
                                <Image style={{height:25, width:25}} source={require('../../assets/felizao.png')} />
                                <Image style={{height:25, width:25}} source={require('../../assets/felizinho.png')} />
                                <Image style={{height:25, width:25}} source={require('../../assets/normalzinho.png')} />
                                <Image style={{height:25, width:25}} source={require('../../assets/tristinho.png')} />
                                <Image style={{height:25, width:25}} source={require('../../assets/tristao.png')} />
                                <Image style={{height:25, width:25}} source={require('../../assets/raiva.png')} />
                            </View>
                        </View>
                        <View style={{backgroundColor:corAtividadeDia, marginHorizontal:6,paddingHorizontal:6, borderRadius:10, marginTop:6, marginBottom:6}}>
                            <Text style={{fontWeight:'bold',color:'#fff', fontSize:20}}>Atividades realizadas no dia:</Text>
                            <Text style={{fontWeight:'bold',color:'#fff', fontSize:17}}>{atividadesDia}</Text>
                            <Text style={{fontWeight:'bold',color:'#fff', fontSize:20, marginTop:5}}>Medicações utilizadas no dia:</Text>
                            <Text style={{fontWeight:'bold',color:'#fff', fontSize:17}}>{medicacaoDia}</Text>
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
