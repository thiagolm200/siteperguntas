const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define([
    'titulo',
{
    titulo:{
        type: Sequelize.STRING
    }
    
});