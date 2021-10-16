import React, { Component,useState, useEffect } from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
CriaHorasAgendaveis=()=>{
    const [ano,setAno]=useState(0);
    const [mes,setMes]=useState(0);
    const [dia,setDia]=useState(0);
    const [dataConcat,setdataConcat]=useState(0);

    useEffect(()=>{
        let today = new Date();
        setAno(today.getFullYear());
        //mes começa do 0
        setMes(today.getMonth()+1);
        setDia(today.getDate());
    },[]);
    async function salvaDatas(){

    }
     function geraDatas(){
        //quantos dias tem o mes
         let daysInMonth = new Date(ano,mes+1,0).getDate();
         let anoData=ano;
         let mesData=mes;
         let diaData= dia-1;
        for(let i= 0; i<14;i++){
            diaData=diaData+1;
            if(diaData==daysInMonth){
                    mesData= mesData+1;
                    diaData=1;
                }
            if(mesData>12){
                anoData=anoData+1;
                mesData=1;
            }
            let ldataConcat=diaData+"-"+mesData+'-'+anoData;
           // console.log(ldataConcat);
         }
            
        }
    
    return(
        <View><TouchableOpacity onPress={() =>geraDatas()}><Text>Cria horas agendáveis</Text></TouchableOpacity></View>
    );

}
export default CriaHorasAgendaveis;