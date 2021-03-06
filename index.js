const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');  
const connection = require('./database/database');  
const Pergunta = require('./database/pergunta'); 
const Resposta = require('./database/Resposta');

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
    Pergunta.findAll({
        raw:true, 
        order: [['id','desc']]
    }).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    })
    
});

app.get("/fazerpergunta",(req,res)=>{
    res.render("fazerpergunta");
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var desc = req.body.desc;
    
    Pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(() => {
        res.redirect("/");
    });
    
});

app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {
        if(pergunta != undefined){ //pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else{
            res.redirect("/");
            alert("Pergunta não encontrada!");
        }
    })
})

app.post("/salvarresposta",(req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8000,()=>{
    console.log("conectado com sucesso.");
});