const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

connection.authenticate().then(() => {
    console.log("Conexão efetuada com o banco de dados");
}).catch((msgErro) => {
    console.log(msgErro);
});

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/perguntas",(req,res)=>{
    res.render("perguntas");
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var desc = req.body.desc;
    res.send("Formulário Salvo"+ titulo);
});

app.listen(8000,()=>{
    console.log("conectado com sucesso.");
});