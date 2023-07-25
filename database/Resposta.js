const sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("resposta",{
    corpo: {
        type: sequelize.TEXT,
        allowNull: false //Not null 
    }, 
    perguntaId:{ //fk forma de relacionamento mais simples que tem 

        type: sequelize.INTEGER, 
        allowNULL:false 
    }
});
//Resposta,sync({force: false}) para não recriar caso ja exista 
Resposta.sync({force: false}).then(() => {});


module.exports = Resposta;