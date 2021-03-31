const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes');

app.use('/', routes);
app.use('/users', routes);

app.listen('port', process.env.PORT || 3000);

module.exports = app;