const sequelize = require('sequelize');

    const connection = new sequelize('guiaperguntas','root','cassio',{
      host: 'localhost',
      dialect:'mysql'
       });

module.exports = connection;