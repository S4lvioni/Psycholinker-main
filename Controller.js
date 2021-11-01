const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { response } = require('express');
const paciente = require('./models/paciente');
const md5 = require('./../Psycholinker-main/MD5')


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let dias = models.dias;
let agendados = models.agendado;
let atividades = models.atividade;
let diasuteis = models.diasuteis;
let horasuteis = models.horasuteis;
let medicacoes = models.remedio;
let observacoes = models.Observacoes;
let pacientes = models.Pacientes;
let relatorios = models.relatorio;
let terapeutas = models.Terapeutas;
let selectedactivity = models.atividadexrelatorio;
let selectedmed = models.remedioxrelatorio;

//cadastro terapeuta

function codificar() {

}

app.post('/createTerapeuta', async (req, res) => {
    console.log(req.body);

    await terapeutas.create({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        cr: req.body.cr,
        especializacao: req.body.especializacao,
        password: md5(req.body.password),
        telefone: req.body.telefone
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Cadastrado com Sucesso!'));
    }

});

//Cadastro paciente
app.post('/createPaciente', async (req, res) => {
    let response = await pacientes.findOne({
        where: { code: req.body.code }
    });
    response.name = req.body.name;
    response.cpf = req.body.cpf,
        response.email = req.body.email,
        response.password = md5(req.body.password),
        response.telefone = req.body.telefone,
        response.save();
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Cadastrado com Sucesso!'));
    }

});


//Criar observação
app.post('/createNote', async (req, res) => {
    console.log(req.body);
    await observacoes.create({
        texto: req.body.texto,
        terapeutaId: req.body.terapeutaId,
        pacienteId: req.body.pacienteId,
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});

//Criar observação
app.post('/createActivity', async (req, res) => {
    console.log(req.body);
    await atividades.create({
        nome: req.body.nome,
        pacienteId: req.body.pacienteId,
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});


app.post('/createMed', async (req, res) => {
    console.log(req.body);
    await medicacoes.create({
        nome: req.body.nome,
        pacienteId: req.body.pacienteId,
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});

app.post('/createReport', async (req, res) => {
    console.log(req.body);
    await relatorios.create({
        humor: req.body.humor,
        pacienteId: req.body.pacienteId,
        texto: req.body.texto,
        emissao: req.body.emissao
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});


app.post('/createSelectedActivity', async (req, res) => {
    console.log(req.body);
    await selectedactivity.create({
        nome: req.body.nome,
        atividadeId: req.body.id,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano,
        pacienteId: req.body.pacienteId,
        data: req.body.data
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});


app.post('/createSelectedMed', async (req, res) => {
    console.log(req.body);
    await selectedmed.create({
        nome: req.body.nome,
        remedioId: req.body.id,
        dia: req.body.dia,
        mes: req.body.mes,
        ano: req.body.ano,
        pacienteId: req.body.pacienteId,
        data: req.body.data
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Criado com Sucesso!'));
    }

});



//Cadastro código de paciente
app.post('/createCodPaciente', async (req, res) => {
    await pacientes.create({
        terapeutaId: req.body.terapeutaId,
        code: req.body.code
    })

});


app.post('/confereCodigo', async (req, res) => {
    let response = await pacientes.findOne({
        where: { code: req.body.code }
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});

app.post('/relatorioExiste', async (req, res) => {
    let response = await relatorios.findOne({
        where: {
            emissao: req.body.emissao,
            pacienteId: req.body.pacienteId
        }
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify(1));
    } else {
        res.send(JSON.stringify(0));
    }

});
app.post('/loginterapeuta', async (req, res) => {
    let response = await terapeutas.findOne({
        where: { email: req.body.email, password: md5(req.body.password) }
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});


app.post('/loginpaciente', async (req, res) => {
    let response = await pacientes.findOne({
        where: { email: req.body.email, password: md5(req.body.password) }
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});


app.post('/perfilpaciente', async (req, res) => {
    let response = await pacientes.findOne({
        where: { name: req.body.name, id: req.body.id },
        attributes: ['name', 'id']
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
    console.log('aqui')
});




//listar pacientes
app.post('/listaPaciente', async (req, res) => {
    let response = await pacientes.findAll({
        where: { terapeutaId: req.body.terapeutaId },
        attributes: ['id', 'name', 'email', 'telefone'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})


//listar observacoes
app.post('/listaObservacoes', async (req, res) => {
    let response = await observacoes.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['id', 'texto'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})

//listar atividades
app.post('/listaAtividades', async (req, res) => {
    let response = await atividades.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['id', 'nome'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})


app.post('/listaMedicamentos', async (req, res) => {
    let response = await medicacoes.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['id', 'nome'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})


app.post('/listaAtividadesSelecionadas', async (req, res) => {
    let response = await selectedactivity.findAll({
        where: {
            pacienteId: req.body.pacienteId,
            data: req.body.data
        },
        attributes: ['nome', 'dia', 'data', 'id'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})


app.post('/listaMedicamentosSelecionados', async (req, res) => {
    let response = await selectedmed.findAll({
        where: {
            pacienteId: req.body.pacienteId,
            data: req.body.data
        },
        attributes: ['nome', 'dia', 'data', 'id'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})

app.post('/listaAtividadesSelecionadasDiarias', async (req, res) => {
    let response = await selectedactivity.findAll({
        where: {
            pacienteId: req.body.pacienteId,
            data: req.body.data
        },
        attributes: ['nome', 'dia', 'data', 'id'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }

})

app.post('/listaMedicamentosSelecionadosPaciente', async (req, res) => {
    let response = await selectedmed.findAll({
        where: {
            pacienteId: req.body.pacienteId,
            mes: req.body.mes,
            dia: req.body.dia
        },
        attributes: ['nome', 'dia', 'id'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})


app.post('/listaAtividadesSelecionadasPaciente', async (req, res) => {
    let response = await selectedactivity.findAll({
        where: {
            pacienteId: req.body.pacienteId,
            mes: req.body.mes,
            dia: req.body.dia
        },
        attributes: ['nome', 'dia', 'id'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})




app.post('/listaRelatorios', async (req, res) => {
    let response = await relatorios.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['id', 'humor', 'texto', 'emissao'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})




app.post('/listaTerapeuta', async (req, res) => {
    let response = await pacientes.findAll({
        where: { id: req.body.pacienteId },
        attributes: ['terapeutaId'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
        console.log(response);
    }
})

//Delete pacinte
app.post('/deletePaciente', async (req, res) => {
    let response5 = await selectedmed.destroy({
        where: { pacienteId: req.body.id }
    })
    let response4 = await relatorios.destroy({
        where: { pacienteId: req.body.id }
    })
    let response3 = await selectedactivity.destroy({
        where: { pacienteId: req.body.id }
    })
    let response2 = await atividades.destroy({
        where: { pacienteId: req.body.id }
    })
    let response = await pacientes.destroy({
        where: { id: req.body.id }
    })
});

//Editar pacientes
app.post('/editPaciente', async (req, res) => {
    let response = await pacientes.findOne({
        where: { id: req.body.id }
    });
    response.name = req.body.name;
    response.email = req.body.email;
    response.telefone = req.body.telefone;
    response.save();

});

//gabi
//cria dias uteis
app.post('/createDiasUteis', async (req, res) => {
    let response = await diasuteis.findOne({
        where: { terapeutaId: req.body.terapeutaId }
    });
    //se nao existe cria
    if (!response) {
        await diasuteis.create({
            terapeutaId: req.body.terapeutaId,
            dia: req.body.dia
        })
        //se ja existe edita
    } else {
        response.terapeutaId = req.body.terapeutaId;
        response.dia = req.body.dia;
        response.save();
    }
});

//cria horas uteis
app.post('/createHorasUteis', async (req, res) => {
    let response = await terapeutas.findOne({
        where: { id: req.body.terapeutaId, horasconf: true }
    });
    //se nao existe cria
    if (response) {
        await horasuteis.destroy({
            where: { terapeutaId: req.body.terapeutaId },
            //truncate: true
        })
        response.horasconf = false
        response.save();
    }
    await horasuteis.create({
        terapeutaId: req.body.terapeutaId,
        hora: req.body.hora
    })
    res.json('ok');
});
app.post('/confHora', async (req, res) => {
    let response = await terapeutas.findOne({
        where: { id: req.body.terapeutaId }
    });
    response.horasconf = true
    response.save();
    res.json('ok');
});


//cria datas disponiveis na semana
app.post('/createDias', async (req, res) => {
    let response = await terapeutas.findOne({
        where: { id: req.body.terapeutaId }
    });
    //se nao existe cria
    if (response) {
        let response2 = await dias.findOne({
            where: { dia: req.body.dia }
        });
        if (!response2) {
            //só cria se nao existe
            await dias.create({
                terapeutaId: req.body.terapeutaId,
                dia: req.body.dia,
                status: req.body.status,
                vinculado: false
            })

        }

    }
    res.json('ok');

});

//Busca dias uteis
app.post('/buscaDiasUteis', async (req, res) => {

    let response = await diasuteis.findAll({
        where: { terapeutaId: req.body.terapeutaId },
        attributes: ['dia'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

})
//Busca horas uteis
app.post('/buscaHorasUteis', async (req, res) => {

    let response = await horasuteis.findAll({
        where: { terapeutaId: req.body.terapeutaId },
        attributes: ['hora'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

})
//lista de dias (apagar dps)
app.post('/buscaDias', async (req, res) => {

    let response = await dias.findAll({
        where: { terapeutaId: req.body.terapeutaId },
        attributes: ['dia', 'status'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

})

//Busca agendamentos
app.post('/buscaAgendamentos', async (req, res) => {

    let response = await agendados.findAll({
        where: { terapeutaId: req.body.terapeutaId },
        attributes: ['horario', 'paciente'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});

//Busca agendamentos do paciente
/*app.post('/buscaAgendamentosPaciente', async (req, res) => {

    let response = await agendados.findAll({
        where: {pacienteId:req.body.pacienteId },
        attributes: ['horario'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});*/

app.post('/ocuparHorario', async (req, res) => {
    console.log(req.body);
    await agendados.create({
        terapeutaId: req.body.terapeutaId,
        pacienteId: req.body.pacienteId,
        horario: req.body.horario,
        paciente: req.body.paciente
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(JSON.stringify('Cadastrado com Sucesso!'));
    }

});

app.post('/deleteHorario', async (req, res) => {
    let response = await agendados.destroy({
        where: { terapeutaId: req.body.terapeutaId, horario: req.body.horario }
    });
    res.json('ok');
});

app.post('/graficosHumor', async (req, res) => {
    let response = await relatorios.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['humor', 'emissao'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
})

app.post('/listaAtividadesAll', async (req, res) => {
    let response = await selectedactivity.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['nome', 'data'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
});

app.post('/listaRemediosAll', async (req, res) => {
    let response = await selectedmed.findAll({
        where: { pacienteId: req.body.pacienteId },
        attributes: ['nome', 'data'],
        raw: 'false'
    })
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }
})


let port = process.env.PORT  || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
