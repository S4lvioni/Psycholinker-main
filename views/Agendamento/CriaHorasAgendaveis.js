import React, { Component,useState, useEffect } from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
import config from '../../config/config.json';
import { AsyncStorage } from 'react-native';
CriaHorasAgendaveis=(id)=>{
    //controle
    const [execucao, setExecucao] = useState(1);
    //variaveis
    const [ano,setAno]=useState(0);
    const [mes,setMes]=useState(0);
    const [dia,setDia]=useState(0);
    const [diasUteis,setDiasUteis]=useState(0);
    //const [dataConcat,setdataConcat]=useState([]);

    useEffect(()=>{
        let today = new Date();
        setAno(today.getFullYear());
        //mes começa do 0
        setMes(today.getMonth()+1);
        setDia(today.getDate());
    },[]);
    useEffect(() => {
       buscaDiasUteis();
    }, []);
    
    async function buscaDiasUteis() {
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
            await AsyncStorage.setItem('diasUteis', JSON.stringify(json));//json é  a resposta

            let response = await AsyncStorage.getItem('diasUteis');
            const jsonNovo = JSON.parse(response);
            setDiasUteis(jsonNovo);
        }
    }
    async function salvaDatas(dataConcat){
        console.log(dataConcat);
        let index3=0;
        for (const [index, value] of dataConcat) {
            let response = await fetch(config.urlRoot + 'createDias', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    terapeutaId: id.data,
                    dia:dataConcat[ index3],
                    status:true
                
                }),
            
            });
            index3= index3+1;
        }
    }
    async function geraDatas(){
        //quantos dias tem o mes
         let daysInMonth = new Date(ano,mes+1,0).getDate();
         let anoData=ano;
         let mesData=mes;
         let diaData= dia-1;
         let newArr = [];
        for(let i= 0; i<14;i++){
            diaData=diaData+1;
            //se chegou o fim do mes aumenta o mes
            if(diaData==daysInMonth){
                    mesData= mesData+1;
                    diaData=1;
                }
            //se chegou mes 12 passa o ano e reseta o mes
            if(mesData>12){
                anoData=anoData+1;
                mesData=1;
            }
           newArr.push(diaData+"-"+mesData+'-'+anoData);
           console.log(newArr);
         }
         salvaDatas(newArr);   
            
            
    }
    
    return(
        <View style={{justifyContent:'center', alignItems:'center', marginTop:15, marginBottom:10}}><TouchableOpacity onPress={() =>geraDatas()}><Text style={{fontWeight:'bold'}}>Cria horas agendáveis</Text></TouchableOpacity></View>
    );

}
export default CriaHorasAgendaveis;