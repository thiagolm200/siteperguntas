const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define(
    'titulo',
{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
    
})

Pergunta.sync({force: false}).then(() => {});
