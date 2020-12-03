const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const pergunta = require('./database/pergunta');
const Pergunta = require('./database/pergunta');

connection.authenticate().then(() => {
    console.log("Conexão efetuada com o banco de dados");
}).catch((msgErro) => {
    console.log(msgErro);
});
//Dizendo ao express usar EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));
//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true, order: [
        ['id','desc']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    })
    
});

app.get("/perguntas",(req,res)=>{
    res.render("perguntas");
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var desc = req.body.desc;
    res.send("Formulário Salvo"+ titulo);
    Pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(()=>{
        res.redirect("/");
    });
    
});

app.listen(8000,()=>{
    console.log("conectado com sucesso.");
});

