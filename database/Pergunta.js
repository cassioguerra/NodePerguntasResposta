const sequelize = require("sequelize");
const connection = require("./database")

//definr o model 
const pergunta = connection.define('pergunta',{
    titulo:{
        //para passar tipo
        //allowNull: false not null
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
type: sequelize.TEXT,
allowNull: false
    }
});
//para gera mensagem que criou a tabela
pergunta.sync({force: false}).then(() => {});

module.exports = pergunta;