const mongoose = require('mongoose');

//Conexão Banco de Dados
mongoose.connect('mongodb+srv://admin:codextreinee123@cluster0.gpbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true});
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

module.exports = app;