const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let agendamentos = models.agendamentos;
let atividades = models.atividades;
let datas = models.datas;
let medicacoes = models.Medicacoes;
let observacaos = models.Observacoes;
let pacientes = models.Pacientes;
let relatorios = models.Relatorios;
let terapeutas = models.Terapeutas;
let tipoatividades = models.tipoAtividades;

/* AULA 12 COMENTOU TUDO ISSO */

/*
app.get('/create',async (req,res)=>{
    let create=await terapeuta.create({
        name:'alexandre',
        password:'363254',
        cpf:'36528598569',
        cr:'235486',
        email:'alexandretsalvione@gmail.com',
        especializacao:'assistente social',
        telefone:'675212052',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Terapeutao criado com sucesso!');
});

app.get('/read', async (req,res)=>{
    let read=await terapeuta.findAll({
        raw:true,
    });
    console.log(read);
});
//nao chama paciente
app.get('/update', async (req,res)=> {
    let update=await terapeuta.findByPk(2/*,
        {include:[{all:true}]}
        ).then((response)=>{
           response.name='novoNome';
           response.password='abcde';
           response.save();
    });
});
*/

app.post('/loginterapeuta', async (req, res) => {
    let response = await terapeuta.findOne({
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
    let response = await paciente.findOne({
        where: { email: req.body.email, password: req.body.password }
    })
    //console.log(response);
    if (response === null) {
        res.send(JSON.stringify('error'));
    } else {
        res.send(response);
    }

});

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
