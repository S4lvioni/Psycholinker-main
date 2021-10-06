import React, { Component,useState, useEffect } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import { css } from '../../assets/CSS/css';
AgendamentoPaciente =()=>{
  const [btn,setBtn]=useState(false);
  const [ano,setAno]=useState(0);
  const [mes,setMes]=useState(0);
  const [dia,setDia]=useState(0);
  const [hora,setHora]=useState(null);
  const [diaLista,setDiaLista]=useState(0);
  const [horaLista,setHoraLista]=useState(['10:30','11:30']);
  const [diasCal,setDiasCal]=useState([]);
  const [diaSelecionado,setDiaSelecionado]=useState(0);

 
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

//lista dias
useEffect(() => {
  //quantos dias tem o mes
    let daysInMonth = new Date(ano,mes+1,0).getDate();
    let valores =[];
    for(let i=1;i<=daysInMonth;i++){
      let d =new Date(ano,mes,i);
    //  valores.push(true,i,dias[d.getDay()]);
    valores.push({
      status: true,
      weekday:dias[d.getDay()],
      numero:i

    });
    }
    setDiasCal(valores);

}, [mes,ano,diaSelecionado]);

  //Botoes da agenda
  function voltarData(){
    let mountDate=new Date(ano,mes,1);
    mountDate.setMonth(mountDate.getMonth()-1);
    setAno(mountDate.getFullYear());
    setMes(mountDate.getMonth());
    setDia(0);
  }
    function passarData(){
    let mountDate=new Date(ano,mes,1);
    mountDate.setMonth(mountDate.getMonth()+1);
    setAno(mountDate.getFullYear());
    setMes(mountDate.getMonth());
    setDia(0);
    console.log(diaSelecionado);
    console.log(mes)
  
  }
  //modal
  function teste(item){
    setDiaSelecionado(item+'-'+meses[mes]+'-'+ano);
    console.log(diaSelecionado);
    setBtn(!btn);
  }
  return(
    <View>
    <View style={styles.dateInfo}>
    <View style={styles.prevData}>
      <TouchableOpacity style={styles.prevIcon} onPress={voltarData}><Text style={css.modaltexto}>Ant</Text></TouchableOpacity>
    </View>
    <View style={styles.tituloArea}><Text>{meses[mes]} {ano}</Text></View>
    <View style={styles.nextData}>
    <TouchableOpacity style={styles.nextIcon} onPress={passarData}><Text style={css.modaltexto}>prox</Text></TouchableOpacity>
    </View>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
        {diasCal.map((item,key)=>(
          <TouchableOpacity
            style={styles.dateItem}
            key={key}
            onPress={()=>item.status? teste(item.numero):null}
            style={{
              opacity:item.status?1 : 0.5,
              padding:9
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
        <Text>{diaSelecionado}oii</Text>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
          {horaLista.map((item,key)=>(
              <TouchableOpacity
                style={styles.timeItem}
                key={key}
                onPress={()=>{}}
              >
                <Text style={styles.timeItemText}>{item}</Text>
              </TouchableOpacity>
              
          ))}
      </ScrollView>
    </View>:
    <View></View>
    }
    
 </View>
  );

}
const styles = StyleSheet.create({
  dateInfo: {
    flexDirection: 'row'
  },
  prevData:{
   flex:1,
   justifyContent: 'flex-end',
   alignItems:'flex-end'
  },
  tituloArea:{
    width:140,
    justifyContent: 'center',
    alignItems:'center'
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
  }
});

export default AgendamentoPaciente;
