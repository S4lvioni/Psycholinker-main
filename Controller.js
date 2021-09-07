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

});

//Cadastro paciente
app.post('/createPaciente',async (req,res)=>{
    let response=await pacientes.findOne({
        where:{code: req.body.code}
    });
            response.name=req.body.name;
            response.cpf=req.body.cpf,
            response.email=req.body.email,
            response.password=req.body.password,
            response.telefone=req.body.telefone,
            response.save();

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
        where: { code: req.body.code}
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
//listar pacientes
app.post('/gerenciaPaciente', async (req,res) => {
    let response = await pacientes.findAll({
        where:{ terapeutaId : req.body.terapeutaId},
        attributes:['id','name','email'],
        raw:'false'
    })
    if(response === null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(response);
        console.log(response);
    }
})

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
