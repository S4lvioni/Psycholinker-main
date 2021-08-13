const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { useReducer } = require('react');



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let agendamento = models.Agendamento;
let atividade = models.Ativdade;
let data = models.Data;
let medicacoe = models.Medicacoe;
let observacao = models.Observacao;
let paciente = models.Paciente;
let relatorio = models.Relatorio;
let terapeuta = models.Terapeuta;
let tipoatividade = models.TipoAtividade;

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

app.post('/login',async (req,res)=>{
    let response=await terapeuta.findOne({
        where:{email:req.body.email, password:req.body.password}
    })
    //console.log(response);
    if(response === null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(response);
    }
    
});
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando');
});
