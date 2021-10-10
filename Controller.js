const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { response } = require('express');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let agendamentos = models.agendamentos;
let atividades = models.atividade;
let datas = models.datas;
let medicacoes = models.Medicacoes;
let observacoes = models.Observacoes;
let pacientes = models.Pacientes;
let relatorios = models.relatorio;
let terapeutas = models.Terapeutas;

//cadastro terapeuta
app.post('/createTerapeuta', async (req, res) => {
    console.log(req.body);
    await terapeutas.create({
        name: req.body.name,
        cpf: req.body.cpf,
        email: req.body.email,
        cr: req.body.cr,
        especializacao: req.body.especializacao,
        password: req.body.password,
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
        response.password = req.body.password,
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

app.post('/createReport', async (req, res) => {
    console.log(req.body);
    await relatorios.create({
        humor: req.body.humor,
        pacienteId: req.body.pacienteId,
        texto:req.body.texto
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
app.post('/loginterapeuta', async (req, res) => {
    let response = await terapeutas.findOne({
        where: { email: req.body.email, password: req.body.password }
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
        where: { email: req.body.email, password: req.body.password }
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
        attributes: ['id', 'name'],
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


let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
