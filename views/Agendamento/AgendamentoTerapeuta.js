/**
  -O que falta: Arrumar bug da primeira hora (uma forma de atualizar a lsita)
  -Arrumar um botao de atualizarno lugar do gera
  -Arrumar css
 */
  import React, { Component,useState, useEffect,useCallback } from 'react';
  import { Text, View, StyleSheet,TouchableOpacity,ScrollView,Image,TextInput } from 'react-native';
  import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { AsyncStorage } from 'react-native';
  import { css } from '../../assets/CSS/css';
  import AgendamentoConfig from '../Agendamento/AgendamentoConfig';
  import config from '../../config/config.json';
  import { set } from 'react-native-reanimated';
  AgendamentoTerapeuta=(id)=>{
    const [btn,setBtn]=useState(false);
    const [ano,setAno]=useState(0);
    const [mes,setMes]=useState(0);
    const [dia,setDia]=useState(0);
    const [diaLista,setDiaLista]=useState(0);
    const [diasCal,setDiasCal]=useState([]);
    const [diaSelecionado,setDiaSelecionado]=useState(0);
   //Escolha de datas
    const [horaLista,setHoraLista]=useState([]);
    const [horaArray,setHoraArray]=useState([]);
    const [agendamentoArray,setAgendamentaArray]=useState([]);
    const [agendamentoLista,setAgendamentLista]=useState([]);
    const [agendamentoHora,setAgendamentHora]=useState([]);
    const [diasUteis, setDiasUteis] = useState(0);
    const [horaSelecionada,setHoraSelecionada]=useState([null]);
    const [nomePaciente,setNomePaciente]=useState('Ocupado');
    const [pacienteNome, setpacienteNome] = useState([]);
    //controle
    const [display, setDisplay] = useState('none');
    const [execucao, setExecucao] = useState(1);
    const [execucao2, setExecucao2] = useState(1);
    const [execucao3, setExecucao3] = useState(1);
    const [clicado, setClicado] = useState(0);
    const [clicadoHora, setClicadoHora] = useState(0);
    const [ocuparLiberar, setOcuparLiberar] = useState(3);
    const [mostra, setMostra] = useState(false);
    const [atualizar, setAtualizar] = useState(false);
    
  
   
    const meses=[
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    const dias=[
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab'
    ];
  
    //monta datas
  useEffect(()=>{
      let today = new Date();
      setAno(today.getFullYear());
      setMes(today.getMonth());
      setDiaLista(today.getDate());
   
  
  },[]);
  
  useEffect(()=>{
    buscaDias();
  },[execucao,atualizar]);
  
  useEffect(()=>{
    buscaHorasUteis();
  },[execucao2,atualizar]);
  
  useEffect(()=>{
    buscaAgendamentos();
  },[execucao3,atualizar]);
  
  //datas jaa gendadas 
  async function  buscaAgendamentos() {
    let response = await fetch(`${config.urlRoot}buscaAgendamentos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terapeutaId: id.data
        })
  
    });
    //obtem resposta do controller
    let json = await response.json();
    if (json === 'error') {
        console.log('error');
    } else {
        // //persistencia dos dados para utilizar na aplicação
        await AsyncStorage.setItem('agendamentoData', JSON.stringify(json));//json é  a resposta
  
        let response = await AsyncStorage.getItem('agendamentoData');
        const jsonNovo = JSON.parse(response);
        let l2= jsonNovo;
        let lnovo2=[];
        let tam= l2.length;
        if(tam>=1){
          for(let i=0;i<tam;i++){
            lnovo2.push({
              horario:l2[i].horario,
              paciente:l2[i].paciente
            });
          }
          setAgendamentaArray(lnovo2);
        }
    }
    if (execucao3 < 2) {
      setExecucao3(2);
  }
  }
  
  //horas para verificar disponibilidade
  async function buscaHorasUteis() {
    let response = await fetch(`${config.urlRoot}buscaHorasUteis`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terapeutaId: id.data
        })
  
    });
    //obtem resposta do controller
    let json = await response.json();
    if (json === 'error') {
        console.log('error');
    } else {
        // //persistencia dos dados para utilizar na aplicação
        await AsyncStorage.setItem('horasUteisData', JSON.stringify(json));//json é  a resposta
        
        let response = await AsyncStorage.getItem('horasUteisData');
        const jsonNovo2 = JSON.parse(response);
        let l=jsonNovo2;
        let tam=l.length
        let newArr=[];
        if(tam>1){
          for(let i=0;i<tam;i++){
            newArr.push(l[i].hora);
            
          }
          setHoraArray(newArr);
        }
        if (execucao2 < 2) {
            setExecucao2(2);
        }
    }
  }
  //dias para verificar status(disponibilidade)
  async function buscaDias() {
    let response = await fetch(`${config.urlRoot}buscaDiasUteis`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terapeutaId: id.data
        })
  
    });
    //obtem resposta do controller
    let json = await response.json();
    if (json === 'error') {
        console.log('error');
    } else {
        // //persistencia dos dados para utilizar na aplicação
        await AsyncStorage.setItem('diasUteisData', JSON.stringify(json));//json é  a resposta
  
        let response = await AsyncStorage.getItem('diasUteisData');
        const jsonNovo = JSON.parse(response);
        let l= jsonNovo;
          setDiasUteis(l);
        if (execucao < 2) {
            setExecucao(2);
        }else{
          geraCalendario(l,mes);
        }
    }
  }
    async function geraCalendario(l,mt){
      if(l[0].dia!=undefined){
        let diaU=l[0].dia
        //quantos dias tem o mes
        let daysInMonth = new Date(ano,mt+1,0).getDate();
        let valores =[];
        for(let i=1;i<=daysInMonth;i++){
          let d =new Date(ano,mt,i);
          let anoD = d.getFullYear();
          let mesD =d.getMonth();
          let diaD =d.getDate();
          let concatenado=diaD+'-'+mesD+'-'+anoD;
          let statusD;
          if(diaU[d.getDay()]==1){
              statusD=diaU[d.getDay()];
          }else{
            statusD=diaU[d.getDay()];
          }
    
        //  valores.push(true,i,dias[d.getDay()]);
        valores.push({
          status: statusD,
          weekday:dias[d.getDay()],
          numero:i
    
        });
        }
        setDiasCal(valores);
      }else{
        buscaDias();
      }
     
    }
    //Botoes da agenda
    function ajustarMesVolta(){
     
    }
    function voltarData(){
      let mountDate=new Date(ano,mes,1);
      mountDate.setMonth(mountDate.getMonth()-1);
      setAno(mountDate.getFullYear());
      let mt=mountDate.getMonth()
      setMes(mt);
      setDia(0);
      if(btn==true){
        setBtn(false);
      }
      console.log('mountDate.getMonth()-1')
      console.log(mt)
      geraCalendario(diasUteis,mt);
    }
      function passarData(){
      let mountDate=new Date(ano,mes,1);
      mountDate.setMonth(mountDate.getMonth()+1);
      setAno(mountDate.getFullYear());
      setMes(mountDate.getMonth());
      let mt=mountDate.getMonth();
      setDia(0);
      if(btn==true){
        setBtn(false);
      }
     
     geraCalendario(diasUteis,mt);
    
    }
    //modal
    function dataEscolhida(item){
      let tam= horaArray.length;
      setDiaSelecionado(item+'-'+meses[mes]+'-'+ano);
      //passa agendamentos para novo array
      let tamA=agendamentoArray.length;
      let newAgendamento=[];
      let newAgendamentoNome=[];
      for(let j=0;j<tamA;j++){
        newAgendamento.push(agendamentoArray[j].horario);
        newAgendamentoNome.push(agendamentoArray[j].paciente);
      }
      setAgendamentLista(newAgendamento);
      if(clicado==0){
        setClicado(item+'-'+meses[mes]+'-'+ano);
        //confere quantas horas, passsa para novo array q junta os objs
        let tam= horaArray.length;
        let newArray=[];
        let pacientesN=[];
        let posi=0;
        console.log('-------------')
        for(let i=0;i<tam;i++){
          if(newAgendamento.includes(item+'-'+meses[mes]+'-'+ano+'-'+horaArray[i])==true){
            console.log('do array')

            console.log('selecionado')
            console.log(item+'-'+meses[mes]+'-'+ano+'-'+horaArray[i])
            var idx = newAgendamento.indexOf(item+'-'+meses[mes]+'-'+ano+'-'+horaArray[i]);
            console.log(newAgendamentoNome[idx]);
            pacientesN.push(newAgendamentoNome[idx]);
            newArray.push({
              hora:horaArray[i],
              status2:false,
              position:posi
            });    
            console.log('pose:'+posi+'i:'+i) 
            posi=posi+1;  

              
          }else{
            newArray.push({
              hora:horaArray[i],
              status2:true
            });
          }
          
        }
        console.log(pacientesN)
        setpacienteNome(pacientesN);
        setHoraLista(newArray);
      }else{
        setOcuparLiberar(3);
        setClicado(0);
        setClicadoHora(0);
      }
      
      setBtn(!btn);
    }
  
    function horaEscolhida(item,status2,position){
      if(clicadoHora==0){
        console.log(position)
          setNomePaciente(pacienteNome[position]);
          setClicadoHora(item);
          setOcuparLiberar(status2);
         
      }else{
        setClicadoHora(0);
        setOcuparLiberar(3);
      }
    }
  
    async function senForm(){
      if(clicadoHora!=0){
        let concat=diaSelecionado+'-'+clicadoHora;
        if(ocuparLiberar==true){
          let response = await fetch(config.urlRoot + 'ocuparHorario', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            terapeutaId:id.data,
            horario:concat,
            paciente:'Você'
    
            })
        })
        let json = await response.json();
        if (json === 'error') {
            await AsyncStorage.clear();
        } else {
          console.log('ocuapdo');
          //adicionar algo para identificar o recem ocupado
        }
        }else{
          let response2 = await fetch(config.urlRoot + 'deleteHorario', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            terapeutaId:id.data,
            horario:concat
    
            })
        })
        }
    
       setAtualizar(!atualizar);
       setBtn(!btn);
       setClicado(0);
       setClicadoHora(0);
       setOcuparLiberar(3);
      }else{
        console.log('Defina um horário');
      }
      
    }
    function mudaDisplay(){
      setDisplay('flex');
              setTimeout(() => {
                  setDisplay('none');
              }, 1000);
      setOcuparLiberar(3);
      setBtn(false);
      setClicado(0);
      setClicadoHora(0);
    }
    return(
      
      <View style={styles.fundo}>
        <View style={{height:45, backgroundColor:'#FFB6C1', flexDirection: 'row', alignItems:'center'}}>
        <View style={styles.prevData}>
          <TouchableOpacity style={styles.prevIcon} onPress={()=>voltarData()}  onPressOut={()=>geraCalendario(diasUteis)}><Image style={{width:30,height:30, marginTop:3}}source={require("../../assets/voltar.png")}/></TouchableOpacity>
        </View>
        <View style={{width:180,justifyContent: 'center',alignItems:'center',}}>
          <Text style={{fontWeight:'bold', fontSize:20, justifyContent: 'center',color:'#fff' }}>{meses[mes]} {ano}</Text>
        </View>
        <View style={styles.nextData}>
        <TouchableOpacity style={styles.nextIcon} onPress={()=>passarData()}><Image style={{width:30,height:30, marginTop:3}}source={require("../../assets/passar.png")}/></TouchableOpacity>
        </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
            {diasCal.map((item,key)=>(
              <TouchableOpacity
                style={styles.dateItem}
                key={key}
                onPress={()=>(item.status==true)? dataEscolhida(item.numero):mudaDisplay()}
                style={{
                  backgroundColor:(item.numero+'-'+meses[mes]+'-'+ano==clicado)?'#FFFFFF':'#ffcbdb',
                  padding:9,
                  
                }}
              >
                  <Text style={styles.weekday}>{item.weekday}</Text>
                  <Text style={styles.itemNumber}>{item.numero}</Text>
              </TouchableOpacity>
            ))
            }
        </ScrollView>
        {(btn == true) ?
          <View style={styles.horas}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
              {horaLista.map((item,key)=>(
                  <TouchableOpacity
                    style={styles.timeItem}
                    key={key}
                    onPress={()=>horaEscolhida(item.hora,item.status2,item.position)}
                    style={{
                      opacity:(item.status2==true)?1 : 0.5,
                      backgroundColor:(item.hora==clicadoHora)?'#ffcbdb':'#FFFFFF',
                      padding:9,
                      marginTop:2,
                      borderRadius:100,
                      
                    }}
                  >
                    <Text style={styles.timeItemText}>{item.hora}</Text>
                  </TouchableOpacity>
                  
              ))}
          </ScrollView>
          {(ocuparLiberar == true) ?
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity 
                  style={{
                    marginTop:5,
                    backgroundColor:(0!=clicadoHora)?'#FFB6C1':'#FFFFFF',
                    padding:9,
                    height:35,
                    width:150,
                    alignItems:'center', justifyContent:'center',
                    borderRadius:18
                  }}
                onPress={()=>senForm()}>
                <Text style={css.modaltexto}>Ocupar Horário</Text></TouchableOpacity>
            </View>:(ocuparLiberar == false) ?
            <View>
               <Text style={{marginLeft:6}}>Ocupado por: {nomePaciente}</Text>
              <View style={{alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity 
                    style={{
                      marginTop:5,
                      backgroundColor:(0!=clicadoHora)?'#FFB6C1':'#FFFFFF',
                      padding:9,
                      height:35,
                      width:150,
                      alignItems:'center', justifyContent:'center',
                      borderRadius:18
                    }}
                  onPress={()=>senForm()}>
                  
                  <Text style={{fontWeight:'bold', color:"#000000"}}>Liberar Horário</Text>
                </TouchableOpacity>
              </View>
            </View>
            :<View></View>
            }
        </View>:<View></View>
        }
      <View>
          <Text style={css.login__msg(display)}>Dia indisponível!</Text>
      </View>
   </View>
    );
  
  }
  const styles = StyleSheet.create({
    fundo:{
        backgroundColor:'#ffcbdb'
    },
    prevData:{
     flex:1,
     justifyContent: 'flex-end',
     alignItems:'flex-end'
    },
    nextData:{
      flex:1,
      alignItems:'flex-start'
    },
    dateList:{
      
    },
    dateItem:{
      width:45,
      justifyContent: 'center',
      borderRadius: 10,
      paddingTop:5,
      paddingBottom:5
    },
    weekday:{
      fontSize:16,
      fontWeight:'bold'
    },
    itemNumber:{
      fontSize:16,
      fontWeight:'bold'
    },
    timeItem:{
        width:75,
        height:40,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10
    },
    timeItemText:{
        fontSize:16,
        fontWeight:'bold'
    },
    horas:{
      backgroundColor:'#FFFFFF'
    }
  });
  
  export default AgendamentoTerapeuta;
  