//configurações de agendamento: colocar horas trabalhadas por dia => definirá horas disponiveis para cada dia
import React, { Component,useState, useEffect,useCallback } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Modal,Image,TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
import { AsyncStorage } from 'react-native';
import config from '../../config/config.json';
AgendamentoConfig=(id)=>{
  const [modalVisible, setModalVisible] = useState(false);
    const [dias,setDias]=useState([ 
               {dia:'Dom',status:false},
               {dia:'Seg',status:false},
               {dia:'Ter',status:false},
               {dia:'Qua',status:false},
               {dia:'Qui',status:false},
               {dia:'Sex',status:false},
               {dia:'Sab',status:false},
    ]);
    const [horarios,setHorarios]=useState(['07:00','08:00','09:00','10:00','11:00']);
    const [selectedIndex, setSelectedIndex] = useState(null)
    //variavel para passar valor digitado para o array
    const [aux,setAux]=useState();

    //aualiza lista de horas
 const onSaveNote = useCallback(() => {
    if (!aux) {
      return;
    }

    let copyNotes = [...horarios]

    if (selectedIndex !== null) {
      copyNotes[selectedIndex] = aux
    } else {
      copyNotes = copyNotes.concat(aux)
    }

    setHorarios(copyNotes)
    setSelectedIndex(null)
  }, [aux, horarios, setHorarios]);

  
 //Muda o status do dia escolhido 
 function diasDiponiveis(key){
  let newArr = [...dias]; // copying the old datas array
  newArr[key].status =!newArr[key].status ; // replace e.target.value with whatever you want to change it to
  setDias(newArr);
 }

//apaga hora da lista
  function deletarHora(key){
    let newArr = [...horarios];
    var index = newArr.indexOf(key);
    newArr.splice(index, 1);
    setHorarios(newArr);
  }

//envia dias uteis 
async function criaDias(){
  //0= dia nao util 1=dia util
  let d='';
  for(let i=0;i<7;i++){
    if(dias[i].status==true){
        d=d+'1';
    }else{
      d=d+'0';
    }
  }
  //envia dia
  let response = await fetch(config.urlRoot + 'createDiasUteis', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        terapeutaId: id.data,
        dia:d
        
    }),

});
 
}
//cria horas semanais no banco
async function criaHorasBd(i){
  let response = await fetch(config.urlRoot + 'createHorasUteis', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        terapeutaId: id.data,
        hora:horarios[i]
        
    }),

  });
}
// chama função q salva no banco e seta o horário de trabalho como já configurado ao fim
async function criaHoras(){
  for(let i=0;i<horarios.length;i++){
    criaHorasBd(i)
  }
//seta o horário de trabalho como já configurado para que em uma nova configuração a tabela atual seja apagada antes da criação de uma nova
    let response = await fetch(config.urlRoot + 'confHora', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          terapeutaId: id.data,    
      }),
  
    });
  
}

    return(
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={css.SmallIcons} source={require("../../assets/configagendamnto.png")} />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              visible={modalVisible}
            >
              <View>
                 {/*View de configuração*/}
              <Text>Selecione os dias na semana disponíveis para agendamento:</Text>
              <View style={styles.listar}>
                  {dias.map((item,key)=>(
                  <TouchableOpacity
                      key={key}
                      onPressOut={()=>diasDiponiveis(key)}
                      style={{
                          width:50,
                          height:50,
                          marginLeft:2,
                          marginRight:2,
                          justifyContent:'center',
                          alignItems: 'center',
                          borderRadius:30,
                          backgroundColor: item.status ? '#ffcbdb':'#FFFFFF',
                          color: item.status ? '#ffcbdb':'#FFFFFF'
                           
                      }}
                  >
                  <Text style={{color:item.status ?'#FFFFFF':'#000000', fontWeight:'bold', fontSize:16,fontWeight:'bold'}}>{item.dia}</Text>
                </TouchableOpacity>
              
                 ))}
                
            </View>

            <Text>Determine os horários disponíveis diariamente:</Text>
            {/*Adicionar máscara*/}
            <View style={{flexDirection:'row', padding:5}}><TextInput style={styles.placeHora} placeholder='00:00' onChangeText={text => setAux(text)}/>
            <TouchableOpacity style={css.SmallButtons}  onPress={onSaveNote} ><Text style={css.SmallButtonsText} >+</Text></TouchableOpacity></View>
             <SafeAreaView>
                <View style={styles.listar}>
                    {
                        horarios.map((hora,index)=>(
                            <View key={index} >
                                <TouchableOpacity  
                                style={{
                                  width:45,
                                  height:45,
                                  justifyContent:'center',
                                  alignItems: 'center',
                                  borderRadius:30,
                                  backgroundColor:'#ffcbdb', 
                                  marginLeft:6,
                                  marginBottom:20,
                                  color:"#FFFFFF", 
                                  fontWeight:'bold',
                                  fontSize:16,
                                  
                                }} 
                                onPressOut={()=>deletarHora(hora)} >
                                    <Text style={{color:"#FFFFFF", fontWeight:'bold', fontSize:16,fontWeight:'bold'}}>{hora}</Text>
                                </TouchableOpacity>
                                
                            </View>
                          )
                        )
                    }
                </View>
                    
              </SafeAreaView>
              <TouchableOpacity style={css.modalbotao} onPressOut={() => setModalVisible(false)} onPressIn={()=>criaDias()} onPress={()=>criaHoras()}><Text style={{color:"#FFFFFF", fontWeight:'bold'}}>Confirmar</Text></TouchableOpacity>
              </View>    
            </Modal>
           
           </View>
        
        
    )
}
const styles = StyleSheet.create({
    listar:{
        flexDirection: 'row',
    },
    diaLista: {
        width:55,
        height:30,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
        
      },
    diaText:{
     
    },
    placeHora:{
        backgroundColor: "#fff",
        fontSize: 19,
        padding: 7,
        marginBottom: 5,
        width:60,
        borderRadius:10,
        alignItems: 'center',
        justifyContent:'center',

    }   

});
export default AgendamentoConfig;
