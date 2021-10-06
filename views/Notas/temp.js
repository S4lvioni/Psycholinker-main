useEffect(() => {
    async function getName() {
        let response = await AsyncStorage.getItem('emailDataP');
        let json = JSON.parse(response);
        setPacienteId(json.id);
    }
    getName();
}, []);

useEffect(() => {
    verificaTerapeuta();
}, [execucao]);

async function verificaTerapeuta() {
    let response = await fetch(`${config.urlRoot}listaTerapeuta`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pacienteId: pacienteId
        })

    });
    //obtem resposta do controller
    let json = await response.json();
    if (json === 'error') {
        console.log('error');
    } else {
        // //persistencia dos dados para utilizar na aplicação
        await AsyncStorage.setItem('terapeutasData', JSON.stringify(json));//json é  a resposta

        let response = await AsyncStorage.getItem('terapeutasData');
        const jsonNovo = JSON.parse(response);
        setTerapeutaId(jsonNovo);
        if (execucao < 2) {
            setExecucao(2);
        }
        setIdCorreto(terapeutaId[0].terapeutaId);
        console.log(terapeutaId[0].terapeutaId)
    }
}

async function gerenciaAnotacoes() {
    let response = await fetch(`${config.urlRoot}listaNote`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            texto: text[selectedIndex]
        })

    });
    //obtem resposta do controller
    let json = await response.json();
    if (json === 'error') {
        console.log('error');
    } else {
        // //persistencia dos dados para utilizar na aplicação
        await AsyncStorage.setItem('terapeutasData', JSON.stringify(json));//json é  a resposta

        let response = await AsyncStorage.getItem('terapeutasData');
        const jsonNovo = JSON.parse(response);
        setObsId(jsonNovo);
        if (execucao < 2) {
            setExecucao(2);
        }
        console.log(obsId)
    }
}

function doThings() {
    criarNota();
    onSaveNote();
}

async function criarNota() {
    let response = await fetch(config.urlRoot + 'createNote', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            terapeutaId: idCorreto,
            pacienteId: pacienteId,
            texto: text
        }),
    });
}
