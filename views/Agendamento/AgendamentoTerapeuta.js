//configurações de agendamento: colocar horas trabalhadas por dia => definirá horas disponiveis
// 1 = 1h 2 =2h string q vai para o banco : '7,8,9,10,11,14..'
/*var str = 'algum texto';
if(str.match(/texto/)){
  alert('string encontrada');
}*/
//codigo uma const com as horas e um case com uma verificação dentro da string
//vizualizar agenda : meses e dias 
//editar disponibilidade : hora some do dia escolhido (se todas a horas do dia forem ocupados dume o dia)
import React, { Component,useState, useEffect,useCallback } from 'react';
import { Text, View, StyleSheet,TouchableOpacity,ScrollView,Image,TextInput } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { css } from '../../assets/CSS/css';
AgendamentoTerapeuta=()=>{
    const [dias,setDias]=useState([ 
               {dia:'Dom',status:false},
               {dia:'Seg',status:false},
               {dia:'Ter',status:false},
               {dia:'Qua',status:false},
               {dia:'Qui',status:false},
               {dia:'Sex',status:false},
               {dia:'Sab',status:false},
    ]);
    const [horarios,setHorarios]=useState([null]);
    const [selectedIndex, setSelectedIndex] = useState(null)
    //variavel para passar valor digitado para o array
    const [aux,setAux]=useState();
 //Muda o status do dia escolhido 
 function diasDiponiveis(key){
     console.log(key);
     let newArr = [...dias]; // copying the old datas array
     newArr[key].status =!newArr[key].status ; // replace e.target.value with whatever you want to change it to
     setDias(newArr);
    }
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

  function deletarHora(key){
    let newArr = [...horarios];
    var index = newArr.indexOf(key);
    newArr.splice(index, 1);
    setHorarios(newArr);
    console.log(newArr);
   console.log(key)
  }

    return(
        <View>
            <TouchableOpacity>
                <Image style={styles.configIcon} source={require("../../assets/configuracoes.png")} />
            </TouchableOpacity>
           
            {/*View de configuração*/}
            <Text>Selecione os dias na semana disponíveis para agendamento:</Text>
            <View style={styles.listar}>
                {dias.map((item,key)=>(
                <TouchableOpacity
                    key={key}
                    onPressOut={()=>diasDiponiveis(key)}
                    style={{
                        width:55,
                        height:30,
                        justifyContent:'center',
                        alignItems: 'center',
                        borderRadius:10,
                        backgroundColor: item.status ? '#ffcbdb':'#FFFFFF' 
                    }}
                >
                    <Text style={styles.diaText}>{item.dia}</Text>
                </TouchableOpacity>
              
                 ))}
                
            </View>

            <Text>Determine os horários disponíveis diariamente:</Text>
            {/*Adicionar máscara*/}
            <TextInput style={styles.placeHora} placeholder='00:00' onChangeText={text => setAux(text)}/>
            <TouchableOpacity style={css.login__button} onPress={onSaveNote} ><Text>+</Text></TouchableOpacity>
             <SafeAreaView
                style={styles.listaHora}>
                <View>
                    {
                        horarios.map((hora,index)=>(
                            <View key={index} >
                                <TouchableOpacity onPressOut={()=>deletarHora(hora)}>
                                    <Text>{hora}</Text>
                                </TouchableOpacity>
                                
                            </View>
                          )
                        )
                    }
                </View>
                    
              </SafeAreaView>
        </View>
        
        
    )
}
const styles = StyleSheet.create({
    configIcon:{
        width: 40,
        height: 40,
        },
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
      fontSize:16,
      fontWeight:'bold'
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
export default AgendamentoTerapeuta;
/*        <View style={styles.listar}>
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                        {horarios.map((item,key)=>(
                            <TouchableOpacity
                                key={key}
                                onPressOut={()=>({})}
                                style={{
                                    width:75,
                                    height:30,
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    borderRadius:10
                                }}
                            >
                                <Text style={styles.diaText}>{item.hora}</Text>
                            </TouchableOpacity>
                    
                        ))}
                    </ScrollView>
           
            </View>*/