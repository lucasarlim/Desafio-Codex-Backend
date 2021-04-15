const express = require('express');
const app = express();
const Route = require('./routes');
const bodyParser = require('body-parser');
const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.connect(config.bd_string, {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', Route);


app.listen(process.env.PORT || 3000);

module.exports = app;