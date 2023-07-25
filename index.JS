const express = require("express");
const app = express(); // Adicione parênteses aqui
const bodyParser = require("body-parser");
const connection = require ("./database/database");
const pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");



//database conecção com o banco

connection.authenticate().then(() => {
    console.log("conecção no banco de dados foi feito");
  })
  .catch((msgErro) => {
    console.log("msgErro");
  });

// estou adicionando essa linha de codigo para fazer a cofiguração para EJS
app.set("view engine", "ejs");
app.use(express.static("public"));



//Body Partes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//rotas
app.get("/", (req, res) => {
pergunta.findAll({ raw: true, order:[
  ['id', 'DESC'] //DESC: DECRESENTE; || ASC :CRESENTE 
]}).then(pergunta =>{
  res.render("index",{
    pergunta:pergunta
  })
});
});

app.get("/perguntas", (req, res) => {
  res.render("perguntar");
});

// para salvar as Perguntas 
app.post("/salvarPerguntas", (req, res) => {

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  pergunta.create({
   titulo : titulo,
   descricao : descricao
  }).then((result) => {
    res.redirect("/")
  });
})
// busca por id 
app.get ("/pergunta/:id",(req, res) => {
  var id = req.params.id;
  //busca no banco de dados  obs (findOne vai Buscar apenas um daddo); (where para fazer condições) 
  pergunta.findOne({
    where:{id : id} // busca por id 
   }).then(pergunta =>{
    if (pergunta != undefined) { //pergunta achada 
      Resposta.findAll({
        where : {perguntaId : pergunta.id}, // PRORCURANDO A RESPOSRTA COM ID DA PEGUNTA OU VISE VERSA 
      order: [['id','DESC']]
      }).then(Resposta =>{
        res.render("pergunta",{
          pergunta: pergunta,
          Resposta: Resposta // trazer a pagina pegunta 
        });
      })
    }else{// não encontrada 
  res.redirect("/")
    };
   });
});


app.post("/salvarResposta",(req, res)=>{

  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta; 

  Resposta.create({
    corpo : corpo, 
   perguntaId :perguntaId
  }).then((result) => {
    res.redirect("/pergunta/" +perguntaId)
  });
});

app.listen(2000, () => {
  console.log("APP RODANDO");
});

